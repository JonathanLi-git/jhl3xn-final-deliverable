'use client';
import React , { useState, useEffect } from 'react'

type friend = {
  name: string;
  major: string;
  year: string;
}
export default function Home() {

  const [name, setName] = useState<string | undefined>("");
  const [major, setMajor] = useState<string | undefined>("");
  const [year, setYear] = useState<string | undefined>("");

  const [data, setData] = useState<Array<friend>>([]);

  useEffect(() => {
    async function getPageData() {
      const apiEndpoint = '/api/sql';
      const response = await fetch(apiEndpoint)
      const res = await response.json()
      setData(res.friends)
    }
    getPageData()

  }, []);

  const submit = async (method: string, deleteFriend?: friend) => {
    const response = await fetch('/api/sql', {
      method: 'POST',
      body: JSON.stringify( { name: deleteFriend === undefined ? name : deleteFriend.name , major: major, year: year, method: method}),
      headers: {
        "Content-Type": 'application/json'
      }
    })

    const data = await response.json();
    window.location.reload();
    console.log(data)
  }
  const tableData = [] as Array<JSX.Element>;
  data.forEach((row) => {
    tableData.push(
      <tr key={row.name} className="text-center">
        <td>{row.name}</td>
        <td>{row.major}</td>
        <td>{row.year}</td>
        <button onClick={() => submit("delete", { name: row.name, major: row.major, year: row.year})}>Delete</button>
      </tr>
    )
  })

  return (
    <>
      <div className="flex grid grid-col-1 grid-rows-4 mx-1/3 justify-center gap-10 mt-36 text-slate-950 w-full">
      {/* Section for form inputs */}
      <div className="justify-center w-96">
        <p className="text-white">Your name:</p>
        <input type="text" onChange={(event) => {setName(event.target.value)}} className="scale-120" name="name" required />        
      </div>  
      <div className="justify-center">
        <p className="text-white">Major:</p>
        <input type="text" onChange={(event) => {setMajor(event.target.value)}} className="form-control" name="name" required />        
      </div>  
      <div className="justify-center">
        <p className="text-white">Year:</p>
        <input type="text" onChange={(event) => {setYear(event.target.value)}} className="form-control" name="name" required />        
      </div>  
      <div className="justify-center grid grid-cols-2 gap-5 h-8">
        <button className="w-full bg-cyan-500 hover:scale-110 transition duration-150 ease-out hover:ease-in"
                onClick={() => submit("add")}>
          Add</button>
          <button className="w-full bg-cyan-500 hover:scale-110 transition duration-150 ease-out hover:ease-in"
                onClick={() => submit("update")}>
          update</button>
      </div>

      </div>
      { /* Section for displaying table */ }
      <div className="flex justify-center mt-36">
        <table className="table-fixed  border-spacing-2 border border-white text-white w-1/2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>Year</th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>
            { /* Items in table grouped in rows */}
            {tableData}
          </tbody>
        </table>
      </div>
    </>
  )
}
