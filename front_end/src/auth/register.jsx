import React from "react";

const Register = () => {
  return (
    <div>
      <div
        id="main"
        className="w-full  mx-auto   bg-gradient-to-r from-blue-600 to-blue-800 flex min-h-screen"
      >
        <div
          id="left"
          className="w-full lg:w-1/2 bg-neutral-900 text-white  flex flex-col lg:items-end justify-center     rounded-xl mx-30 my-15 lg:m-0 "
        >
          <div className="container px-2 bg-neutral-900  lg:pl-33 w-full mx-10 py-32 rounded-4xl">
            <div id="logo" className=" mx-10 w-32 h-32 rounded-md  pt-4 ">
              <img src="/src/logo.png"></img>{" "}
            </div>

            <div className="pt-5">
              <h1 className="text-xl mx-10 font-bold justify-start">Sign Up</h1>
              <p className="text-slate-600 mx-10">
                Already have an account?
                <a className="font-semibold text-white">&nbsp;Sign In</a>
              </p>
            </div>

            <form className="pt-6 container px-10 mx-auto ">
              <div>
                <label className="block text-sm required mb-1 text-slate-600">
                  First Name*
                </label>
                <input
                  type="text"
                  placeholder="Cate"
                  className="bg-neutral-800 w-full px-4  py-2 rounded-md ml-1 border-1 "
                ></input>
              </div>

              <div>
                <label className="block text-sm required mb-1 text-slate-600 pt-5">
                  Last Name*
                </label>
                <input
                  type="text"
                  placeholder="DiCaprio"
                  className="bg-neutral-800 w-full px-4 py-2 rounded-md ml-1 border-1 "
                ></input>
              </div>

              <div>
                <label className="block text-sm mb-1 text-slate-600 pt-5">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="johnny.depp@left4code.com"
                  className="w-full px-4 py-2 bg-neutral-800 text-white border ml-1 border-neutral-700 rounded"
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
              <div className="grid grid-cols-4 gap-4 ">
                <div className="bg-blue-900  h-1 mt-2 ml-2 rounded-md "></div>
                <div className="bg-blue-900  h-1 mt-2 ml-2 rounded-md "></div>
                <div className="bg-blue-900  h-1 mt-2  rounded-md "></div>
                <div className="bg-slate-400  h-1 mt-2 rounded-md "></div>
              </div>

              <p className="text-slate-600 pt-2 ml-1 text-sm">
                What is a secure Password?
              </p>

              <div>
                <label className="block text-sm required mb-1 text-slate-600 pt-5">
                  Password Confirmation*
                </label>
                <input
                  type="password"
                  placeholder="*********"
                  className="bg-neutral-800 w-full px-4  py-2 rounded-md ml-1 border-1 "
                ></input>
              </div>
              <div className=" pt-4 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className=" accent-blue-500" />
                  <p className="text-gray-400">
               
                    I agree to the Envato
                    <a href="#" className="text-white hover:none">
                      Privacy Policy
                    </a>
                  </p>
                </label>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-2 rounded-full border-1 font-semibold mt-4 hover:opacity-90">
                Sign In
              </button>
              <button className="w-full bg-neutral-800 py-2 rounded-full font-semibold hover:opacity-90">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-r from-blue-800 to-blue-200 text-white p-12 flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Embrace Excellence <br /> in Dashboard Development
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

export default Register;
