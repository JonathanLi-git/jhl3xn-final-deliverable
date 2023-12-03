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
      "CALL markDone(?, ?);";
    const result = await query({ query: queryString, values: params });
    res.status(200).json({ data: result });
  }
}
