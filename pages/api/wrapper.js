import mysql from 'mysql2/promise';

/**
 * Queries all data in database.
 * 
 * @returns - Data of the database
 */
export async function query ({query, values=[]}) {

    const connection = await mysql.createConnection({
        host: 'mysql01.cs.virginia.edu',
        user: 'jhl3xn',
        database: 'jhl3xn',
        password: '771732Aa'
    })

    // simple query
    const [result] = await connection.execute(query, values)
    connection.end();
    return result
}
