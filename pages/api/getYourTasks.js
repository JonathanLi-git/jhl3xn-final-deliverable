import { query } from "./queries";
/**
 * Queries all data in database.
 *
 * @returns - Data of the database
 */
export default async function handler(req, res) {
  if (req.method == "POST") {
    const params = req.body.params;
    const queryString =
      "SELECT c2.name, c2.description, c2.due_date, c2.task_ID FROM assigned as c1, task as c2, active_task as c3 WHERE c1.task_ID = c2.task_ID AND c2.task_ID = c3.task_ID AND c1.person_ID = ?;";
    const result = await query({ query: queryString, values: params });
    res.status(200).json({ data: result });
  }
}
