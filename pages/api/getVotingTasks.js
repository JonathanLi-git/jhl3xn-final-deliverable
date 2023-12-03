import { query } from "./queries";
/**
 * Queries all data in database.
 *
 * @returns - Data of the database
 */
export default async function handler(req, res) {
  if (req.method == "POST") {
    const sort = req.body.params[0];
    let queryString;
    if (sort == "true")
      queryString =
        "SELECT c2.name, c2.description, c4.first_name, c4.last_name, c2.due_date, c1.total_votes, c2.task_ID FROM voting_task as c1, task as c2, assigned as c3, " +
        "person as c4 WHERE c1.task_ID = c2.task_ID AND c3.task_ID = c2.task_ID AND c4.person_ID = c3.person_ID ORDER BY c2.due_date;";
    else
      queryString =
        "SELECT c2.name, c2.description, c4.first_name, c4.last_name, c2.due_date, c1.total_votes, c2.task_ID FROM voting_task as c1, task as c2, assigned as c3, " +
        "person as c4 WHERE c1.task_ID = c2.task_ID AND c3.task_ID = c2.task_ID AND c4.person_ID = c3.person_ID;";
    const result = await query({ query: queryString, values: [] });
    res.status(200).json({ data: result });
  }
}
