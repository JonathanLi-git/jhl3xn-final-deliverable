"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "../../../components/navbar";
import { rowObj, vote, getUser, getVotingTasks } from "./helper";

export interface pageProps {
  params: { personID: string };
}

export const UserPage = ({ params }: pageProps) => {
  const router = useRouter();
  const session = useSession();
  const [personInfo, setPersonInfo] = useState<any>(undefined);
  const [taskInfo, setTaskInfo] = useState<any>(undefined);
  const [updateVote, setUpdateVote] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);

  if (session.status === "unauthenticated" || session.data?.user.name+"" !== params.personID) {
    router.push("/login");
  }

  const getRows = (list: Array<rowObj>, { params }: pageProps) => {
    const rows = [] as Array<JSX.Element>;

    list.forEach((row) => {
      rows.push(
        <tr className="bg-zinc-100 text-black border-b">
          <th scope="row" className="px-6 py-4">
            {row.taskName}
          </th>
          <td className="px-6 py-4">{row.description}</td>
          <td className="px-6 py-4">{row.first_name + " " + row.last_name}</td>
          <td className="px-6 py-4">{row.dueDate}</td>
          <td className="px-6 py-4">{row.total_votes}</td>
          <td className="px-6 py-4">
            <button
              className="bg-green-600 mr-5 px-2 py-2 transition duration-150 ease-out hover:scale-105 text-zinc-100"
              onClick={() => {
                console.log(row.taskId, params.personID, "debil");
                vote(row.taskId, params.personID);
                setUpdateVote(!updateVote);
              }}>
              Yes
            </button>
          </td>
        </tr>
      );
    });

    return rows;
  };

  useEffect(() => {
    getUser({ params }).then((data) => setPersonInfo(data));
    getVotingTasks(sort, { params }).then((data) => setTaskInfo(data));
  }, [updateVote, sort]);

  let rowParams = [] as Array<rowObj>;
  if (taskInfo !== undefined) {
    taskInfo.forEach(
      (task: {
        name: any;
        description: any;
        first_name: any;
        last_name: any;
        due_date: any;
        total_votes: any;
        task_ID: any;
      }) => {
        rowParams.push({
          taskName: task.name,
          description: task.description,
          first_name: task.first_name,
          last_name: task.last_name,
          dueDate: task.due_date,
          total_votes: task.total_votes,
          taskId: task.task_ID,
        });
      }
    );
  }
  const rows = getRows(rowParams, { params });

  return personInfo ? (
    <div className="bg-zinc-100 h-screen">
      <Navbar
        username={personInfo.username as string}
        personId={params.personID as string}
      />
      <div className="flex justify-center bg-zinc-100 w-screen h-fit ">
        <div className="rounded transition duration-150 ease-out hover:scale-105 bg-purple-500 my-20 h-12 w-24 text-white">
          <button className="h-12 w-24" onClick={() => {setSort(!sort)}}>
            Sort By Due Date
          </button>
        </div>
        <div className="my-20 mx-20 bg-black h-1/4 w-3/5">
          <div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-black uppercase bg-zinc-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assignee
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Votes
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vote
                    </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-zinc-100 h-screen">
      <div className="flex justify-center w-screen h-fit ">
        <div className="mt-96 pt-24" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
