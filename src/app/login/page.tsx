'use client';
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()
  const [loginUsername, setLoginUsername] = useState<string | undefined>("");
  const session = useSession();
  const [loginPassword, setLoginPassword] = useState<string | undefined>("");
  const [createUsername, setCreateUsername] = useState<string | undefined>("");
  const [createPassword, setCreatePassword] = useState<string | undefined>("");
  const [createFirstName, setCreateFirstName] = useState<string | undefined>(
    ""
  );
  const [createLastName, setCreateLastName] = useState<string | undefined>("");

  /**
   * Handlers for submission
   * 
   */
  const handleSubmit = async () => {

    const res = await signIn('credentials', {
      username: loginUsername,
      password: loginPassword,
      redirect: false
    })

    if (res?.status == 200) {
      const personId = session.data?.user.name;
      if (personId !== undefined) {
        console.log("sldkfjsdlkf", personId);
        router.push(`/users/${personId}`);
      }
    }
  }

  const submit = async (method: string) => {
    if (method == "create_login") {
      // Call api with create login parameters
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          params: [
            createUsername,
            createPassword,
            createFirstName,
            createLastName,
          ],
          method: "create_login",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } 
    
    window.location.reload()
  };

  return (
    <>
      <div className="h-screen w-screen grid grid-cols-6 font-sans">
        <div className="col-start-1 col-end-2 bg-purple-500"></div>

        <div className="grid grid-cols-2 gap-20 col-start-2 col-end-7 bg-white py-52 px-32">
          <div className="grid grid-rows-5 text-center mx-16">
            <p className="text-3xl text-zinc-800 font-bold">Sign in</p>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">Username</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setLoginUsername(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">Password</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <button
                className="w-72 h-12 transition duration-150 ease-out hover:scale-105 bg-purple-600 text-white text-xl font-semibold"
                onClick={() => handleSubmit()}>
                Sign in
              </button>
            </div>
          </div>

          <div className="grid grid-rows-6 text-center mx-16">
            <p className="text-3xl text-zinc-800 font-bold">Create Login</p>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">Username</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setCreateUsername(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">Password</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setCreatePassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">First Name</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setCreateFirstName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <div>
                <label className="w-full text-xl">Last Name</label>
              </div>
              <div className="h-12 border-2">
                <input
                  className="w-full h-full rounded-sm"
                  type="text"
                  onChange={(event) => {
                    setCreateLastName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="text-left text-black font-light">
              <button
                className="w-72 h-12 transition duration-150 ease-out hover:scale-105 bg-purple-600 text-white text-xl font-semibold"
                onClick={() => submit("create_login")}>
                Create Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
