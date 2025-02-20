// context/SocketContext.js
'use client';

import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:1337'); // Connect to Strapi WebSocket server
    newSocket.on('connect', function() {
      console.log('connected to the server');
    });
    setSocket(newSocket);

    return () => newSocket.close(); // Cleanup on unmount
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;