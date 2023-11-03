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

        if (method == "create_login") {
            const queryString = "CALL `create_login`(?, ?, ?, ?);"
            const result = await query({ query: queryString, values: params })
            console.log(result)
            res.status(200).json({ data: result })
        }
        else if (method == "login") {
            console.log("here")
            const queryString = "CALL `login`(?, ?);"
            const result = await query({ query: queryString, values: params })
            console.log(result)
            res.status(200).json({ data: result })
        }
    }
}

