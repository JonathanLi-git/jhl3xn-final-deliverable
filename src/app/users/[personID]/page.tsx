"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface pageProps {
  params: { personID: string };
}

export const UserPage = ({ params }: pageProps) => {
  const router = useRouter();
  const session = useSession();
  const [personInfo, setPersonInfo] = useState<any>(undefined);

  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/getPerson", {
        method: "POST",
        body: JSON.stringify({
          params: [params.personID],
          method: "get_person",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("waaaaa", data.data[0])
      return data.data[0];
    };
    getUser().then((data) => setPersonInfo(data))
  }, [])

  console.log(session);
  console.log("fdsa", personInfo)

  return personInfo ? (
    <div>
      <p>Welcome {personInfo.username}!</p>
      <p>This is the custom Page for person_ID {params.personID}</p>
      <button
        className="w-72 h-12 transition duration-150 ease-out hover:scale-105 bg-purple-600 text-white text-xl font-semibold"
        onClick={() => {
          signOut({ callbackUrl: "https://ec-milestone.vercel.app/login" });
        }}>
        Sign Out
      </button>
    </div>
  ) : <span>loading</span>;
};

export default UserPage;
