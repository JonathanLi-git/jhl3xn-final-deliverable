"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface pageProps {
  params: { personID: string };
}
export const UserPage = ({ params }: pageProps) => {
  const router = useRouter();
  const session = useSession();
  console.log(session);
  
  if(session.status === "unauthenticated") {
    router.push('/login')
  }

  return (
    <div>
      Page for person {params.personID}
      <button
        className="w-72 h-12 transition duration-150 ease-out hover:scale-105 bg-purple-600 text-white text-xl font-semibold"
        onClick={() => {
          signOut({ callbackUrl: 'https://ec-milestone.vercel.app/login'});
        }}>
        Sign Out
      </button>
    </div>
  );
};

export default UserPage;
