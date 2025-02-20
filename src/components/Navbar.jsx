// components/Navbar.jsx
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { useModal } from './ModalContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { openModal } = useModal();

  const [token , setToken] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setToken(token);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ChatApp
        </Link>
        <div className="flex items-center space-x-4">
          {!token ?
            <>
              <Button variant="outline" onClick={() => openModal('login')}>
                Login
              </Button>
              <Button onClick={() => openModal('signup')}>Sign Up</Button>
            </> :
            <>
              <div>Welcome, {localStorage.getItem("uname")}</div>
              <Button variant="outline" onClick={() => handleLogout()}>
                Logout
              </Button>
            </>
          }
        </div>
      </div>
    </nav>
  );
}