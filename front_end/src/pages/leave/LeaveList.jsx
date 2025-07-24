import { useEffect, useState } from "react"; //
import { FaInbox, FaPen, FaEdit } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LeaveList() {
  const [leave, setLeave] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    date: "",
    message: "",
  });
  const fetchLeave = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/leave");
      const data = await res.json();
      setLeave(data);
    } catch (error) {
      console.error("failed to fetch holidays", error);
    }
  };
  // useeffect only call it on mount
  useEffect(() => {
    fetchLeave();
  }, []);

  // delete the user on click delete button
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/leave/${id}`);
      setLeave(leave.filter((item) => item._id !== id));
      toast.success("Leave deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete leave");
    }
  };

  const navigate = useNavigate();

  const editUser = (item) => {
    navigate("/addleave", { state: { data: item } });
  };

  return (
    <div className="h-screen bg-black text-white p-5  rounded-md">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold ">
        Resign Section
      </h2>
      <div className="overflow-x-auto p-5 rounded-md bg-gradient-to-r from-neutral-900  to-blue-900">
        <div className="flex justify-between">
          <div className="flex mb-8 ">
            <button className="border mr-2 px-4 py-2 w-30 h-12 flex gap-3 items-center bg-blue-700 rounded-md ">
              <FaInbox />
              Inbox
            </button>
            <button className="border mr-2 px-4 py-2 h-12 w-30 flex gap-3 items-center bg-blue-700 rounded-md ">
              <span>
                <LuSend />
              </span>{" "}
              Sent
            </button>
            <button className="border px-4 py-2 w-30 h-12 flex gap-3 items-center bg-blue-700 rounded-md ">
              <FaPen />
              Compose
            </button>
          </div>
          <div className="flex justify-end mb-8 ">
            <label className="font-bold text-xl mr-3 ">Search </label>
            <input
              type="text"
              placeholder="Search by subject or from..."
              className="border h-10  rounded-md w-60 text-white px-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="min-w-full border rounded-md border-gray-300 text-md">
          <thead className="bg-neutral-950">
            <tr className="text-center ">
              <th className="border text-lg px-4 py-2">No.</th>
              <th className="border text-lg px-4 py-2">Subject</th>
              <th className="border text-lg px-4 py-2">From</th>
              <th className="border text-lg px-4 py-2">Date</th>
              <th className="border text-lg px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {leave
              .filter(
                (leaves) =>
                  leaves.subject
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  leaves.from.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((leaves, index) => (
                <tr className="hover:bg-gray-500 text-center" key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border  px-4 py-2">{leaves.subject}</td>
                  <td className="border px-4 py-2">{leaves.from}</td>
                  <td className="border px-4 py-2">{leaves.date}</td>
                  <td className="border space-x-5 px-2 py-2">
                    <button onClick={() => editUser(leaves)}>
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => deleteUser(leaves._id)}>
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveList;
