import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sign_in from "./sign_in";
import ProfileForm from "./profile";
import UserPage from "./pages/user/userPage";
import Layout from "./layout";
import Dashboard from "./dashboard";
import Profile_info from "./profile_infos";
import DSR_List from "./pages/dsrListReport/DSR_List";
import Add_Dsr_Report from "./pages/dsrListReport/Add_Dsr_Report";
import AttendanceSheet from "./pages/attendanceSheet/AttendanceSheet";
import Daily_Attendance from "./pages/attendanceSheet/Daily_Attendance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HolidayCalender from "./pages/holidayCalender/HolidayCalender";
import AddEmpReference from "./pages/empReference/AddEmpReference ";
import EmpReferenceListing from "./pages/empReference/EmpReferenceListing";
import AddResign from "./pages/resign/AddResign";
import ResignList from "./pages/resign/ResignList";
import AddLeave from "./pages/leave/AddLeave";
import LeaveList from "./pages/leave/LeaveList";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Sign_in />} />

          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfileForm />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route
                    path="/holidayCalender"
                    element={<HolidayCalender />}
                  />
                  <Route path="/dsr_list" element={<DSR_List />} />
                  <Route path="/add_Dsr_Report" element={<Add_Dsr_Report />} />
                  <Route
                    path="/attendanceSheet"
                    element={<AttendanceSheet />}
                  />
                  <Route
                    path="/daily_Attendance"
                    element={<Daily_Attendance />}
                  />
                  <Route
                    path="/addEmpReference"
                    element={<AddEmpReference />}
                  />
                  <Route
                    path="/empReferenceListing"
                    element={<EmpReferenceListing />}
                  />
                  <Route path="/addResign" element={<AddResign />} />
                  <Route path="/resignList" element={<ResignList />} />
                  <Route path="/info" element={<Profile_info />} />
                  <Route path="/addLeave" element={<AddLeave />} />
                  <Route path="/leaveList" element={<LeaveList />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
