'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext, useEffect } from 'react';
import SocketContext from '@/context/SocketContext';
import ShowMiddle from '@/components/ShowMiddle';
import axios from 'axios';
import { useModal } from '@/components/ModalContext';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(1);
  const socket = useContext(SocketContext);
  const router = useRouter();
  const { openModal } = useModal();

  const [roomId, setRoomId] = useState(null);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('email');
      setRoomId(storedUserId);
    }
  }, [])

  useEffect(() => {
    const fetchIt = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        openModal("login");
        router.push("/");
        return;
      }

      try {
        const response = await axios.get('api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        openModal("login");
        router.push("/");
        console.error('Error:', error);
      }
    }

    fetchIt()
  }, [])

  useEffect(() => {
    if (socket) {
      console.log('Socket connected:', socket);

      // Join the room
      socket.emit('joinRoom', roomId);

      // Listen for incoming messages
      socket.on('recvMsg', (data) => {
        setMessages((prevMessages) => {
          const newData = { id: count, uid: localStorage.getItem('uname'), msg: data.msg, role: 'user' };
          const updatedMessages = [...prevMessages, newData, data];

          // Save updated messages to localStorage
          localStorage.setItem('messages', JSON.stringify(updatedMessages));

          return updatedMessages;
        });

        setCount((prevCount) => prevCount + 1);
      });

      // Cleanup on unmount
      return () => {
        socket.off('recvMsg');
      };
    }
  }, [socket, roomId]);

  // Send a message to the room
  const sendMessage = () => {
    if (socket && message.trim()) {
      const newData = { id: count, uid: localStorage.getItem('uname'), msg: message, role: 'user' };
      socket.emit('sendMsg', { roomId, message: newData }); // Send message to the room
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mt-12">
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`p-2 mt-2 border-b ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <strong>{msg.role === "server" ? "Server" : msg.uid}:</strong> {msg.msg}
            </div>
          ))
        ) : (
          <ShowMiddle data={"Start chatting"} />
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border"
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;