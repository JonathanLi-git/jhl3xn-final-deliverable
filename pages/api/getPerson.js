import { query} from "./queries"
/**
 * Queries all data in database.
 * 
 * @returns - Data of the database
 */
export default async function handler (req, res) {

    if (req.method == "POST") {
        const method = req.body.method
        const params = req.body.params

        if (method == "get_person") {
            const queryString = "SELECT * FROM person WHERE person_ID = ?"
            const result = await query({ query: queryString, values: params })
            res.status(200).json({ data: result })
        }
    }
}

