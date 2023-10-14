/* eslint-disable @next/next/no-img-element */
"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  function login(e: { preventDefault: () => void }) {
    e.preventDefault();
    signIn("google");
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-[#11a37f]">
      <button
        onClick={login}
        className="animate-pulse text-white font-bold text-xl md:text-3xl"
      >
        <img src="https://links.papareact.com/89k" alt="chatGPT" />
        Sign In With Google
      </button>
    </div>
  );
}
