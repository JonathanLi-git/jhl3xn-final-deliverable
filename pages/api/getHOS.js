import { query } from "./queries";
/**
 * Queries all data in database.
 *
 * @returns - Data of the database
 */
export default async function handler(req, res) {
  if (req.method == "POST") {
    const params = req.body.params
    
    const queryString = "SELECT c1.first_name, c1.last_name, c2.details FROM person as c1, hall_of_shame as c2 WHERE c1.person_ID = c2.person_ID;"
    const result = await query({ query: queryString, values: params });
    res.status(200).json({ data: result });
  }
}
