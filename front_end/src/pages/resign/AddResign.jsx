import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";


function AddResign() {
  const navigate = useNavigate();

  const [resign, setResign] = useState({
    from: "",
    subject: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setResign({ ...resign, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!resign.from.trim()) {
      toast.error("From is required");
      return false;
    }
    if (resign.from.length < 3) {
      toast.error("From must be at least 3 characters");
      return false;
    }
    if (!resign.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }
    if (resign.subject.length < 5) {
      toast.error("Subject must be at least 5 characters");
      return false;
    }
    if (!resign.date) {
      toast.error("Date is required");
      return false;
    }
    if (!resign.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    if (resign.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post(`${API_URL}resign/create`, resign, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Resign added successfully!");
      navigate("/resignList"); // redirect to list
    } catch (error) {
      console.log("Error adding resign:", error);
      toast.error("Failed to add resign.");
    }
  };

  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold">
        Resign Section
      </h2>
      <div >
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-xl font-bold">From</label>
            <br />
            <input
              type="text"
              name="from"
              onChange={handleChange}
              value={resign.from}
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
              value={resign.subject}
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
              value={resign.date}
              className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
            />
          </div>

          <div className="mt-4">
            <label className="text-xl font-bold">Message</label>
            <br />
            <textarea
              name="message"
              onChange={handleChange}
              value={resign.message}
              className="border mt-4 rounded-md h-30 bg-neutral-600 w-9/12"
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