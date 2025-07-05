import { useEffect, useState } from "react";
import axios from "axios";

export default function DSRList() {
  const [dsrs, setDsrs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/dsr").then((res) => setDsrs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950  text-white p-10">
      <div className="">
        <h1 className="text-2xl font-bold mb-4   ">DSR LIST</h1>
       
        <div className="flex md:items-center flex-wrap justify-between items-center mb-4 gap-4">
           <div className="mb-5 ">
          <label className="text-lg font-bold mr-2">Select Date</label>
          <input type="date" className="border p-1 rounded" />
        </div>
          <div className="ml-auto">
            <label className="text-md font-medium mr-2">Search:</label>
            <input
              type="text"
              placeholder="Search project..."
              className="border p-1 rounded mb-5 lg:md:mb-0 "
            />
          </div>
        </div>
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto border rounded-md text-white  ">
        <table className="min-w-full  shadow rounded-lg">
          <thead className="bg-neutral-800 ">
            <tr className="text-center text-sm  font-semibold">
              <th className="p-3">No.</th>
              <th className="p-3">Date</th>
              <th className="p-3">Project Name</th>
              <th className="p-3">Project Description</th>
              <th className="p-3">To Do Task</th>
            </tr>
          </thead>
          <tbody className="text-md bg-neutral-800 text-center">
            {dsrs.map((item, index) => (
              <tr key={item._id} className="border-t bg-neutral-800">
                <td className="text-center">{index + 1}</td>
                <td className="py-5 px-3">
                  {" "}
                  {new Date(item.date).toLocaleString()}
                </td>
                <td>{item.projectName}</td>
                <td>{item.projectDescription}</td>
                <td>
                  <ul className="list-disc ml-4">
                    {item.todoTasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
