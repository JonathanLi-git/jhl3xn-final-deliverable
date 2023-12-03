import { pageProps } from "./page";

export type rowObj = {
  taskName: string;
  description: string;
  dueDate: string;
  taskId: string;
};

export const getOverdue = async () => {
  const response = await fetch("/api/getOverdue", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("get overdue tasks", data.data);
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

export const createTask = async (name: string, description: string, due: string, assignee: string) => {
    const response = await fetch("/api/createTask", {
      method: "POST",
      body: JSON.stringify({
        params: [name, description, due, assignee],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("getPersonInfo", data.data);
    return data.data;
  };
