"use client"

import { useModal } from "@/components/ModalContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function page() {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className={`text-3xl font-semibold mb-5 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Welcome to the chat app</h1>
      {isVisible && !localStorage.getItem("token") ?
        <h1 className={`flex items-center text-xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}><Button className="mr-3 animate-bounce" onClick={() => openModal("login")}>Login</Button> to Continue</h1>
        :
        <Link href={'/chat'}><Button>Go To Chat</Button></Link>
      }
    </div>
  );
}