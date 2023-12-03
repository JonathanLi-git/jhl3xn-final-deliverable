import { pageProps } from "./page";

export type rowObj = {
  taskName: string;
  description: string;
  dueDate: string;
  taskId: string;
};


export const markComplete = async (taskId: string, personId: string) => {
  const response = await fetch("/api/markDone", {
    method: "POST",
    body: JSON.stringify({
      params: [taskId, personId],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("Deleting task", data.data);
  return data.data;
};

export const getUser = async ({params}: pageProps) => {
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
  
  export const getTasks = async ({params}: pageProps) => {
    const response = await fetch("/api/getYourTasks", {
      method: "POST",
      body: JSON.stringify({
        params: [params.personID],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("getYourTasks", data.data);
    return data.data
  };