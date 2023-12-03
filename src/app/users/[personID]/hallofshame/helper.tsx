import { pageProps } from "./page";

export type rowObj = {
  first_name: string,
  last_name: string,
  details: string
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

export const getHOS = async () => {
    const response = await fetch("/api/getHOS", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("get HOS", data.data);
    return data.data;
  };