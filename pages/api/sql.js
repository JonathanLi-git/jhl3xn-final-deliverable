import { query} from "./wrapper"
/**
 * Queries all data in database.
 * 
 * @returns - Data of the database
 */
export default async function handler (req, res) {

    if (req.method == "POST") {
        const name = req.body.name
        const major = req.body.major
        const year = parseInt(req.body.year)
        const method = req.body.method

        let queryString;
        const values = [];
        if (method == "update") {
            queryString = "UPDATE friends SET major = ?, year = ? WHERE name = ?"
            values.push(major)
            values.push(year)
            values.push(name)
        }
        else if (method == "add") {
            queryString = "INSERT INTO friends(name, major, year) VALUES(?, ?, ?)";    
            values.push(name)
            values.push(major)
            values.push(year)
        }
        else if (method == "delete")  {
            queryString = "DELETE FROM friends WHERE name = ?";
            values.push(name);
        }
        
        await query({ query: queryString, values: values })
    }

    const queryString = "SELECT * from friends"

    // simple query
    const results = await query({query: queryString, values: []})
    res.status(200).json({ friends: results })
    
    
}

