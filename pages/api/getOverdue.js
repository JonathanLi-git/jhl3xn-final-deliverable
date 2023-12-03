import { query } from "./queries";
/**
 * Queries all data in database.
 *
 * @returns - Data of the database
 */
export default async function handler(req, res) {
  if (req.method == "POST") {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; 
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const params =[year + "-" + month + "-" + day]
    console.log(params)


    const queryString = "SELECT c1.task_ID, c1.name, c1.description, c3.first_name, c3.last_name, c1.due_date FROM task as c1, assigned as c2, person as c3 WHERE " + 
    "c1.task_ID = c2.task_ID AND c2.person_ID = c3.person_ID AND c1.due_date < ?";
    const result = await query({ query: queryString, values: params });
    res.status(200).json({ data: result });
  }
}
