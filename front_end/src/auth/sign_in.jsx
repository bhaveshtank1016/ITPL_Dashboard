import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";



const Sign_in = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(true);
  const { setUser } = useAuth();

  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  // Frontend Validation
  if (!email) {
    toast.error("Email is required");
    return;
  }

  if (!password) {
    toast.error("Password is required");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  } catch (err) {
    toast.error("Something went wrong. Please try again.");
    console.error("Login error:", err);
  }
};


  return (
    <div>
      <ToastContainer />
      <div className="w-full h-min-screen mx-auto bg-gradient-to-r from-blue-600 to-blue-800 flex min-h-screen">
        <div className="w-full lg:w-1/2 bg-neutral-900 text-white flex flex-col lg:items-end justify-center lg:rounded-l-xs rounded-4xl sm:mx-18 mx-8 my-15 lg:m-0">
          <div className="container px-2 bg-neutral-900 lg:pl-33 w-full mx-0 sm:py-32 py-2 rounded-4xl">
            <div className="px-1 container mx-auto">
              <div className="mx-10 w-32 h-32 rounded-md pt-4">
                <img src="./logo.png" />
              </div>

              <div className="pt-5">
                <h1 className="text-xl mx-10 font-bold justify-start">
                  Sign In
                </h1>
                <p className="text-slate-600 mx-10">
                  Don't have an account?
                  <a className="font-semibold text-white">&nbsp;Sign Up</a>
                </p>
              </div>

              {showNotification && (
                <div className="bg-neutral-800 text-sm p-4 rounded-md flex justify-between items-center mb-6 mt-3 ml-10 mr-8">
                  <span>
                    Welcome to Tailwise demo! Simply click Sign In to explore
                    and access our documentation.
                  </span>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="ml-4 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <form className="container px-10 mx-auto" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm mb-1 text-slate-600 pt-5">
                  Email*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johnny.depp@left4code.com"
                  className="w-full px-4 py-2 bg-neutral-800 text-white border ml-1 border-neutral-700 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-600 pt-5">
                  Password*
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********"
                  className="bg-neutral-800 w-full px-4 py-2 rounded-md ml-1 border border-neutral-700 text-white"
                />
              </div>

              <div className="flex justify-between pt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="accent-blue-500" />
                  <p className="text-sm text-gray-400 ml-2 shrink-0">
                    Remember Me
                  </p>
                </label>
                <p className="text-gray-400 text-sm">Forgot Password?</p>
              </div>

              <div className="pt-4 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-500" />
                  <p className="text-gray-400">
                    I agree to the Envato{" "}
                    <a href="#" className="text-white">
                      Privacy Policy
                    </a>
                  </p>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-2 rounded-full border-1 font-semibold mt-4 hover:opacity-90 mb-4"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-r from-blue-800 to-blue-200 text-white p-12 flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Innovate your imagination <br /> into Reality
          </h1>
          <p className="text-lg max-w-md text-blue-100">
            Unlock the potential of Tailwise. Build stunning, structured
            dashboards using Tailwind & React.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/1.jpg"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/2.jpg"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/1.jpg"
              />
            </div>
            <p className="text-sm">Over 7k+ strong and growing!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;
