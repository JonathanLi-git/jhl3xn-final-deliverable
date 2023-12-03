import { query } from "./queries";
/**
 * Queries all data in database.
 *
 * @returns - Data of the database
 */
export default async function handler(req, res) {
  if (req.method == "POST") {
    const params = req.body.params
    
    const queryString = "SELECT name, description, due_date, first_name, last_name FROM active_task as t1, task as t4, assigned as t2, person as t3 WHERE t1.task_ID = t2.task_ID AND t2.person_ID = t3.person_ID AND t1.task_ID = t4.task_ID;";
    const result = await query({ query: queryString, values: params });
    res.status(200).json({ data: result });
  }
}
