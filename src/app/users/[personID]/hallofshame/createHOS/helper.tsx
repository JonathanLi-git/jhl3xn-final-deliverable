import { pageProps } from "./page";

export type rowObj = {
  taskName: string;
  description: string;
  dueDate: string;
  taskId: string;
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

export const createHOS = async (user: string, description: string) => {
    const response = await fetch("/api/createHOS", {
      method: "POST",
      body: JSON.stringify({
        params: [user, description]
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("add to hos", data.data);
    return data.data;
  };
