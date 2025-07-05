// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// function AddLeave() {
//   const [leave, setleave] = useState({
//     from: "",
//     subject: "",
//     date: "",
//     message: "",
//   });
//   const handleChange = (e) => {
//     setleave({ ...leave, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8001/api/leave",leave);
//       setleave({ from: "", subject: "", date: "", message: "" });
//       toast.success("leave added successfully!");
//     } catch (error) {
//       console.log("Error adding leavesection:", error);
//       toast.error("Failed to add leavesection.");
//     }
//   };
//   return (
//     <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
//       <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold ">
//         leave Section
//       </h2>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className="text-xl  font-bold">From</label>
//             <br />
//             <input
//               type="text"
//               name="from"
//               onChange={handleChange}
//               value={leave.from}
//               required
//               className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
//             />
//           </div>
//           <div className="mt-4">
//             <label className="text-xl  font-bold">Subject</label>
//             <br />
//             <input
//               type="text"
//               name="subject"
//               onChange={handleChange}
//               value={leave.subject}
//               required
//               className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
//             />
//           </div>
//           <div className="mt-4">
            
//             <label className="text-xl  font-bold">
//               Date <span>select</span>
//             </label>
//             <br />
//             <input
//               type="date"
              
//               name="date"
//               onChange={handleChange}
//               value={leave.date}
//               required
//               className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
//             />  
//           </div>
//           <div className="mt-4">
//             <label className="text-xl  font-bold">Message</label>
//             <br />
//             <textarea
//               type="text"
//               name="message"
//               onChange={handleChange}
//               value={leave.message}
//               required
//               className="border mt-4 rounded-md h-30 bg-neutral-600 w-9/12 "
//             />
//           </div>

//           <button
//             type="submit"
//             className="text-xl px-4 py-2 bg-blue-700 text-white mt-5 rounded-md"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddLeave;
// AddLeave.jsx


import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function AddLeave() {
  const [leave, setleave] = useState({
    from: "",
    subject: "",
    date: "",
    message: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Check if editing
  useEffect(() => {
    if (location.state?.data) {
      setleave(location.state.data);
      setEditId(location.state.data._id);
      setEditMode(true);
    }
  }, [location]);

  const handleChange = (e) => {
    setleave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(`http://localhost:8001/api/leave/${editId}`, leave);
        toast.success("Leave updated successfully!");
      } else {
        await axios.post("http://localhost:8001/api/leave", leave);
        toast.success("Leave added successfully!");
      }

      // Reset form
      setleave({ from: "", subject: "", date: "", message: "" });
      setEditMode(false);
      setEditId(null);

      // Navigate back to LeaveList
      navigate("/leavelist");

    } catch (error) {
      console.log("Error submitting leave:", error);
      toast.error("Failed to submit leave.");
    }
  };

  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold ">
        {editMode ? "Edit Leave" : "Add Leave"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-xl font-bold">From</label>
          <br />
          <input
            type="text"
            name="from"
            onChange={handleChange}
            value={leave.from}
            required
            className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
          />
        </div>
        <div className="mt-4">
          <label className="text-xl font-bold">Subject</label>
          <br />
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            value={leave.subject}
            required
            className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
          />
        </div>
        <div className="mt-4">
          <label className="text-xl font-bold">Date</label>
          <br />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={leave.date}
            required
            className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
          />
        </div>
        <div className="mt-4">
          <label className="text-xl font-bold">Message</label>
          <br />
          <textarea
            name="message"
            onChange={handleChange}
            value={leave.message}
            required
            className="border mt-4 rounded-md h-30 bg-neutral-600 w-9/12"
          />
        </div>

        <button
          type="submit"
          className="text-xl px-4 py-2 bg-blue-700 text-white mt-5 rounded-md"
        >
          {editMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddLeave;
