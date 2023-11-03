"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function User({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  );
}
