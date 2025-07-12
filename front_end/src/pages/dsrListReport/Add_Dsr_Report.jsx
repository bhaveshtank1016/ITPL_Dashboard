import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"

export default function AddDSRForm() {
  const [form, setForm] = useState({
    email: "",
    date: "",
    attachment: "",
    projectName: "",
    projectDescription: "",
    todoTask: "",
  });

  const [todoTasks, setTodoTasks] = useState([]);

  const handleAddTodo = () => {
    if (form.todoTask.trim() !== "") {
      setTodoTasks([...todoTasks, form.todoTask]);
      setForm({ ...form, todoTask: "" });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      ...form,
      todoTasks,
    };
    await axios.post("http://localhost:8001/api/dsr", payload);
    toast.success("DSR submitted successfully!");
    setForm({
      email: "",
      date: "",
      attachment: "",
      projectName: "",
      projectDescription: "",
      todoTask: "",
    });
    setTodoTasks([]);
  } catch (error) {
    console.error("Submission failed:", error);
    toast.error("Failed to submit DSR");
  }
};


  return (
    <div className="min-h-screen  text-white bg-black px-7 rounded-md py-10">
      <h1 className="text-2xl font-semibold lg:mb-10 mb-10">
        Employee DSR Section / <span className="text-gray-200">Overview</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-neutral-900 to-blue-900 rounded-lg p-10 space-y-6 w-full mx-auto"
      >
        {/* Email & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Select Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full h-12 px-4 py-2 rounded-md  border-white bg-neutral-800 text-white border"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Date</label>
            <input
              type="date"
              className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Attachment */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Attachment <span className="text-gray-400 text-sm">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="(optional)"
            className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white  border-white"
            value={form.attachment}
            onChange={(e) => setForm({ ...form, attachment: e.target.value })}
          />
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Project Name"
              className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
              value={form.projectName}
              onChange={(e) =>
                setForm({ ...form, projectName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Project Description
            </label>
            <input
              type="text"
              placeholder="Description"
              className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white  border-white"
              value={form.projectDescription}
              onChange={(e) =>
                setForm({ ...form, projectDescription: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Project Todo
            </label>
            <input
              type="text"
              placeholder="To Do Task"
              className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white  border-white"
              value={form.todoTask}
              onChange={(e) => setForm({ ...form, todoTask: e.target.value })}
            />
          </div>
        </div>

        {/* Todo List */}
        {todoTasks.length > 0 && (
          <div>
            <label className="block mb-1 text-sm font-semibold">
              To Do List
            </label>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              {todoTasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
