import { pageProps } from "./page";

export type rowObj = {
  taskName: string;
  description: string;
  first_name: string,
  last_name: string,
  dueDate: string;
  total_votes: string,
  taskId: string;
};

export const vote = async (
  taskId: string, personId:string
) => {
  const response = await fetch("/api/vote", {
    method: "POST",
    body: JSON.stringify({
      params: [personId, taskId],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();   
  console.log("voting for task", data.data);
  return data.data;
};

export const getUser = async ({ params }: pageProps) => {
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
  console.log("getPersonInfo", data.data[0]);
  return data.data[0];
};

export const getVotingTasks = async (sort: boolean, { params }: pageProps) => {
  const response = await fetch("/api/getVotingTasks", {
    method: "POST",
    body: JSON.stringify({
      params: [sort.toString()]
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("getVotingTasks", data.data);
  return data.data;
};
