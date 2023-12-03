import { pageProps } from "./page";

export type rowObj = {
  taskName: string;
  description: string;
  dueDate: string;
  first_name: string;
  last_name: string;
};

export const getAllTasks = async () => {
  const response = await fetch("/api/getAllTasks", {
    method: "POST",
    body: JSON.stringify({
      params: [],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("Deleting task", data.data);
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
