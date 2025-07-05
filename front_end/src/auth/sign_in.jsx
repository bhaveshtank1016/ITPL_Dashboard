import { Checkbox } from "@headlessui/react";
import React, { useState } from "react";

const Sign_in = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="">
      <div
        id="main"
        className="w-full h-min-screen  mx-auto   bg-gradient-to-r from-blue-600 to-blue-800 flex min-h-screen "
      >
        <div
          id="left"
          className="w-full  lg:w-1/2 bg-neutral-900 text-white  flex flex-col lg:items-end justify-center  lg:rounded-l-xs rounded-4xl sm:mx-18 mx-8 my-15  lg:m-0 "
        >
          <div className="  container px-2  bg-neutral-900  lg:pl-33 w-full mx-0 sm:py-32 py-2 rounded-4xl  ">
            <div className="px-1 container mx-auto ">
              <div id="logo" className=" mx-10 w-32 h-32 rounded-md  pt-4 ">
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
                <div className="bg-neutral-800 text-sm p-4 rounded-md flex justify-between  items-center mb-6 mt-3 ml-10 mr-8">
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
            <form className=" container px-10 mx-auto ">
              <div>
                <label className="block text-sm mb-1 text-slate-600 pt-5">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="johnny.depp@left4code.com"
                  className="w-full px-4 py-2 bg-neutral-800 text-white border ml-1 border-neutral-700 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm required mb-1 text-slate-600 pt-5">
                  Password*
                </label>
                <input
                  type="password"
                  required
                  placeholder="*********"
                  className="bg-neutral-800 w-full px-4  py-2 rounded-md ml-1 border-1 "
                ></input>
              </div>

              <div className="flex justify-between ">
                <div className="flex pt-2">
                  <label className="flex items-center ">
                    <input
                      type="checkbox"
                      placeholder="none"
                      className=" accent-blue-500"
                      label="remember"
                    />
                    <p className=" text-sm text-gray-400 ml-2 shrink-0">
                      {" "}
                      Remember Me
                    </p>
                  </label>
                </div>
                <p className="text-gray-400 pt-2 shrink-0 ml-1 text-sm">
                  Forgot Password?
                </p>
              </div>

              <div className=" pt-4 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className=" accent-blue-500" />
                  <p className="text-gray-400">
                    {" "}
                    I agree to the Envato{" "}
                    <a href="#" className="text-white hover:none">
                      Privacy Policy
                    </a>
                  </p>
                </label>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-2 rounded-full border-1 font-semibold mt-4 hover:opacity-90 mb-4">
                Sign In
              </button>
              
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-r from-blue-800 to-blue-200 text-white p-12 flex-col justify-center">
          <h1 className="text-4xl  font-bold leading-tight mb-4">
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
                alt="User 1"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="User 2"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User 3"
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
