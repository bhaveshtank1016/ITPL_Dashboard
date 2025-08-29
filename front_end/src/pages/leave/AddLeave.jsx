import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function AddLeave() {
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    from: "",
    leave: "",
    subject: "",
    date: "",
    message: "",
  });

  const [acknowledged, setAcknowledged] = useState(false);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!leave.from) {
      toast.error("Leave start date is required");
      return false;
    }
    if (!leave.leave) {
      toast.error("Leave end date is required");
      return false;
    }
    if (new Date(leave.leave) < new Date(leave.from)) {
      toast.error("End date cannot be earlier than start date");
      return false;
    }
    if (!leave.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }
    if (leave.subject.length < 5) {
      toast.error("Subject must be at least 5 characters");
      return false;
    }
    if (!leave.date) {
      toast.error("Present date is required");
      return false;
    }
    if (!leave.message.trim()) {
      toast.error("Message is required");
      return false;
    }
    if (leave.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }
    if (!acknowledged) {
      toast.error("You must acknowledge the leave policy before submitting");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post(`${API_URL}/create`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Leave request submitted successfully!");
      navigate("/leaveList");
    } catch (error) {
      console.error("Error adding leave:", error);
      toast.error("Failed to submit leave request.");
    }
  };

  return (
    <div className="sm:p-6 min-h-screen rounded-md bg-black text-gray-200">
      <h2 className="text-xl mb-10 pb-3 rounded-md sm:text-2xl font-semibold">
        Leave Application
      </h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label className="text-xl font-bold">Leave From</label>
              <br />
              <input
                type="date"
                name="from"
                onChange={handleChange}
                value={leave.from}
                className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
              />
            </div>

            <div>
              <label className="text-xl font-bold">Leave To</label>
              <br />
              <input
                type="date"
                name="leave"
                onChange={handleChange}
                value={leave.leave}
                className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
              />
            </div>

            <div>
              <label className="text-xl font-bold">Subject</label>
              <br />
              <input
                type="text"
                name="subject"
                onChange={handleChange}
                value={leave.subject}
                className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
              />
            </div>

            <div>
              <label className="text-xl font-bold">Present Date</label>
              <br />
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={leave.date}
                className="border mt-4 rounded-md bg-neutral-600 w-9/12 h-11"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xl font-bold">Message</label>
            <br />
            <textarea
              name="message"
              onChange={handleChange}
              value={leave.message}
              className="border mt-4 rounded-md h-30 bg-neutral-600 w-9/12"
            />
          </div>

          <div className="flex mt-4">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
            <p className="pl-2">
              I acknowledge that I have read the company's leave policy and that
              this submission is final.
            </p>
          </div>

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

export default AddLeave;
