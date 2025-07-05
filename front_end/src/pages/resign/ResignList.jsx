import { useEffect, useState } from "react"; //
import { FaInbox, FaPen } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import PagePagination from "./PagePagination";
import { List } from "@mui/material";



function ResignList() {


  const [page, setPage] = useState(1);
const [resign, setResign] = useState([]);
const [totalPages, setTotalPages] = useState(1);

const fetchResign = async () => {
  try {
    const res = await fetch(`http://localhost:8001/api/resign?page=${page}`);
    const data = await res.json();
    setResign(data.list || []);
    setTotalPages(data.totalPages || 1);
  } catch (error) {
    console.error("Failed to fetch resigns", error);
  }
};

useEffect(() => {
  fetchResign();
}, [page]);


  return (
    <div className="h-screen bg-black text-white p-5 rounded-md">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold ">
        Resign Section
      </h2>
      <div className="flex justify-end">
        <button className="border mr-2 px-4 py-2 w-30 flex gap-3 items-center bg-blue-700 rounded-md ">
          <FaInbox />
          Inbox
        </button>
        <button className="border mr-2 px-4 py-2 w-30 flex gap-3 items-center bg-blue-700 rounded-md ">
          <span>
            <LuSend />
          </span>{" "}
          Sent
        </button>
        <button className="border px-4 py-2 w-30 flex gap-3 items-center bg-blue-700 rounded-md ">
          <FaPen />
          Compose
        </button>
      </div>
      <div className="flex justify-end mt-5">
        <label className="font-bold text-xl mr-3 ">Search </label>
        <input type="text" className="border h-10 rounded-md w-60" />
      </div>
      <div>
        <table className="table-auto mt-10 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-center border">
              <th className="border  border-gray-700 text-lg px-4 py-2">No.</th>
              <th className="border  border-gray-700 text-lg px-4 py-2">
                Subject
              </th>
              <th className="border border-gray-700 text-lg px-4 py-2">From</th>
              <th className="border border-gray-700 text-lg px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {resign.map((resign, index) => (
              <tr className="text-center border" key={index}>
                <td className="border border-gray-700 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {resign.from}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {resign.subject}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {resign.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center"><PagePagination setPage={setPage} totalPages={totalPages} /></div>
    </div>
  );
}

export default ResignList;
