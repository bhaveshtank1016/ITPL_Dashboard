import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function AddResign() {
  const [resign, setResign] = useState({
    from: "",
    subject: "",
    date: "",
    message: "",
  });
  const handleChange = (e) => {
    setResign({ ...resign, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8001/api/resign", resign);
      setResign({ from: "", subject: "", date: "", message: "" });
      toast.success("resgin added successfully!");
    } catch (error) {
      console.log("Error adding resign:", error);
      toast.error("Failed to add resign.");
    }
  };
  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold ">
        Resign Section
      </h2>
      <div >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
          <div className="mt-4">
            <label className="text-xl font-bold">Reason For Leaving </label>
            <br />
            <input
              type="text"
              name="from"
              onChange={handleChange}
              value={resign.from}
              placeholder="Reason"
              required
              className="border mt-4 rounded-md pl-3 bg-neutral-600 w-9/12 h-11"
            />
          </div>
          <div className="mt-4">
            
            <label className="text-xl  font-bold">
              Select Date
            </label>
            <br />
            <input
              type="date"
              
              name="date"
              onChange={handleChange}
              value={resign.date}
              required
              className="border mt-4 p-2 rounded-md bg-neutral-600 w-9/12 h-11"
            />  
          </div>
          </div>
          
          <div className="mt-4">
            <label className="text-xl  font-bold">Message</label>
            <br />
            <textarea
              type="text"
              name="message"
              onChange={handleChange}
              value={resign.message}
              required
              placeholder="Write in Detail"
              className="border mt-4 rounded-md p-2 h-30 bg-neutral-600 w-9/12 "
            />
          </div>
          <div className="flex">
          <input type="checkbox"/> <p className=" pl-2">I acknowledge that I have read the company's resignation policy and that this submission is final. </p></div>
          <br/>
          
          <button
            type="submit"
            className="text-xl px-4 py-2 bg-blue-700 text-white mt-5 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddResign;