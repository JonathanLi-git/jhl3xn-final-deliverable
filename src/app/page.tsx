"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function Home({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className='mt-36 ml-36 w-36 bg-purple-600 transition duration-150 ease-out hover:scale-105'>
      <button className="text-white" onClick={() => router.push('/login')}>Click here to create account and login</button>
    </div>
  );
}
