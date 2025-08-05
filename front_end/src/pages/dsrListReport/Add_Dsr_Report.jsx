import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AddDSRForm() {
  const [form, setForm] = useState({
    email: "",
    date: "",
    attachment: "",
  });

  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "", todoTask: "" },
  ]);

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { projectName: "", projectDescription: "", todoTask: "" },
    ]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        projects,
      };
      console.log("Payload being sent:", payload);
      await axios.post("http://localhost:8001/api/dsr", payload);
      toast.success("DSR submitted successfully!");

      // Reset form
      setForm({ email: "", date: "", attachment: "" });
      setProjects([{ projectName: "", projectDescription: "", todoTask: "" }]);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit DSR");
    }
  };

  return (
    <div className="min-h-screen text-white bg-black px-7 rounded-md py-10">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-10">
        Employee DSR Section / <span className="text-gray-200">Overview</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-neutral-900 to-blue-900 rounded-lg p-10 space-y-6 w-full mx-auto"
      >
        {/* Email & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full h-12 px-4 py-2 rounded-md border-white bg-neutral-800 text-white border"
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
            className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
            value={form.attachment}
            onChange={(e) => setForm({ ...form, attachment: e.target.value })}
          />
        </div>

        {/* Projects */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 relative bg-neutral-950 p-4 rounded-lg"
            >
              <div>
                <label className="block mb-3 text-sm  font-semibold">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.projectName}
                  onChange={(e) =>
                    handleProjectChange(index, "projectName", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-3 text-sm font-semibold">
                  Project Description
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.projectDescription}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      "projectDescription",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-3 text-sm font-semibold">
                  Todo Task
                </label>
                <input
                  type="text"
                  placeholder="To Do Task"
                  className="w-full h-12 px-4 py-2 rounded-md border bg-neutral-800 text-white border-white"
                  value={project.todoTask}
                  onChange={(e) =>
                    handleProjectChange(index, "todoTask", e.target.value)
                  }
                />
              </div>

              {/* Remove button */}
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="absolute top-2 right-2 text-red-400 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add More Project */}
        <div className="flex justify-around">
          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
            >
              Submit DSR
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddProject}
               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md"
            >
              Add More Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
