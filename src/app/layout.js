import { ModalProvider } from '../components/ModalContext';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import './globals.css';
import { SocketProvider } from '@/context/SocketContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> 
        <SocketProvider>
          <ModalProvider>
            <Navbar />
            {children}
            <Modal />
          </ModalProvider>
        </SocketProvider>
      </body>
    </html>
  );
}