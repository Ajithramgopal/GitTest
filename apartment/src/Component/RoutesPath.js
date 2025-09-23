import "../Css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../Home.js";
import Sidebar from "../Navbar/Sidebar.js";
import TopNavbar from "../Navbar/TopNavbar.js";
import Login from "../Pages/Login/Login.js";
import Logout from "../Pages/Login/Logout.js";
import FileUpload from "../Pages/FileUpload.js";
import FileList from "../Pages/FileList.tsx";
import MultiSelectExample from "../Pages/MultiSelectExample.js";
import FormData from "../Redux/FormData.js";
import {
  AuthContext,
  AuthProvider,
  UserContext,
} from "../Context/UserContext.js";
import FormIncrement from "../Redux/FormIncrement.js";
import RamIncrement from "../Redux/RamIncrement.js";
import UserForm from "../Redux/UserForm.js";
import ToastNotification from "./ToastNotification.js";

import AnnounceCreation from "../Pages/Announce/AnnounceCreation.js";
import AnnouncementReport from "../Pages/Announce/AnnouncementReport.js";
import BlockCreation from "../Pages/Block/BlockCreation.js";
import BlockReport from "../Pages/Block/BlockReport.js";
import CategoryCreation from "../Pages/Category/CategoryCreation.js";
import CategoryReport from "../Pages/Category/CategoryReport.js";
import EmployeeCreation from "../Pages/Employee/EmployeeCreation.js";
import EmployeeReport from "../Pages/Employee/EmployeeReport.js";
import FacilityCreation from "../Pages/Facility/FacilityCreation.js";
import FacilityReport from "../Pages/Facility/FacilityReport.js";
import FacilityBookingCreation from "../Pages/FacilityBooking/FacilityBookingCreation.js";
import FacilityBookingReport from "../Pages/FacilityBooking/FacilityBookingReport.js";
import FlatCreation from "../Pages/Flat/FlatCreation.js";
import FlatReport from "../Pages/Flat/FlatReport.js";
import MaintenanceCreation from "../Pages/Maintenance/MaintenanceCreation.js";
import MaintenanceReport from "../Pages/Maintenance/MaintenanceReport.js";
import MaintenanceAssign from "../Pages/Maintenance Assign/MaintenanceAssign.js";
import MaintenanceAssignReport from "../Pages/Maintenance Assign/MaintenanceAssignReport.js";
import MaintenanceDueCreation from "../Pages/Due/MaintenanceDueCreation.js";
import MaintenanceDueReport from "../Pages/Due/MaintenanceDueReport.js";
import OrganizationCreation from "../Pages/Org/OrganizationCreation.js";
import OrganizationReport from "../Pages/Org/OrganizationReport.js";
import PaymentCreation from "../Pages/Payment/PaymentCreation.js";
import PaymentReport from "../Pages/Payment/PaymentReport.js";
import RoleCreation from "../Pages/Role/RoleCreation.js";
import RoleReport from "../Pages/Role/RoleReport.js";
import ResidentsCreation from "../Pages/Residents/ResidentsCreation.js";
import ResidentsReport from "../Pages/Residents/ResidentsReport.js";
import UserCreations from "../Pages/User/UserCreations.js";
import UserReport from "../Pages/User/UserReport.js";
import VisitorCreation from "../Pages/Visitor/VisitorCreation.js";
import VisitorReport from "../Pages/Visitor/VisitorReport.js";
import VisitorLogCreation from "../Pages/VisitorLogs/VisitorLogCreation.js";
import VisitorLogReport from "../Pages/VisitorLogs/VisitorLogReport.js";
import StatusCreation from "../Pages/Status/StatusCreation.js";
import StatusReport from "../Pages/Status/StatusReport.js";

import ExcelComponent from "../ExcelComponent.js";
import OrderTable from "../OrderTable.js";
import User from "../User.js";
import ReportData from "../ReportData.js";

import ObjectDetection from "../ObjectDetection.js";
import Masters from "../Pages/Master/Masters.js";
import IsAuthenticate from "./IsAuthenticate.js";
import { useContext } from "react";
export default function RoutesPath() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <TopNavbar />
        {/* {user && <TopNavbar />} */}
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          {/* {user && <Sidebar />} */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/log" element={<Logout />} />
              <Route path="/home" element={<Home />} />
              <Route path="/file" element={<FileUpload />} />
              <Route path="/list" element={<FileList />} />
              <Route path="/multi" element={<MultiSelectExample />} />
              <Route path="/data" element={<FormData />} />
              <Route path="/inc" element={<FormIncrement />} />
              <Route path="/pl" element={<RamIncrement />} />
              <Route path="/use" element={<UserForm />} />
              <Route path="/toas" element={<ToastNotification />} />
              <Route path="/or" element={<OrderTable />} />

              <Route path="/announce" element={<AnnounceCreation />} />
              <Route path="/announcerep" element={<AnnouncementReport />} />
              <Route path="/block" element={<BlockCreation />} />
              <Route path="/blockrep" element={<BlockReport />} />
              <Route path="/category" element={<CategoryCreation />} />
              <Route path="/categoryrep" element={<CategoryReport />} />
              <Route path="/employee" element={<EmployeeCreation />} />
              <Route path="/employeerep" element={<EmployeeReport />} />
              <Route path="/facility" element={<FacilityCreation />} />
              <Route path="/facilityrep" element={<FacilityReport />} />
              <Route
                path="/facilitybook"
                element={<FacilityBookingCreation />}
              />
              <Route
                path="/facilitybookrep"
                element={<FacilityBookingReport />}
              />
              <Route path="/flat" element={<FlatCreation />} />
              <Route path="/flatrep" element={<FlatReport />} />
              <Route path="/maintenance" element={<MaintenanceCreation />} />
              <Route path="/maintenancerep" element={<MaintenanceReport />} />
              <Route
                path="/maintenanceassign"
                element={<MaintenanceAssign />}
              />
              <Route
                path="/maintenanceassignrep"
                element={<MaintenanceAssignReport />}
              />

              <Route
                path="/maintenancedue"
                element={<MaintenanceDueCreation />}
              />
              <Route
                path="/maintenanceduerep"
                element={<MaintenanceDueReport />}
              />
              <Route path="/org" element={<OrganizationCreation />} />
              <Route path="/orgrep" element={<OrganizationReport />} />
              <Route path="/payment" element={<PaymentCreation />} />
              <Route path="/paymentrep" element={<PaymentReport />} />
              <Route path="/role" element={<RoleCreation />} />
              <Route path="/rolerep" element={<RoleReport />} />
              <Route path="/resident" element={<ResidentsCreation />} />
              <Route path="/residentrep" element={<ResidentsReport />} />
              <Route path="/status" element={<StatusCreation />} />
              <Route path="/statusrep" element={<StatusReport />} />
              <Route path="/visitor" element={<VisitorCreation />} />
              <Route path="/visitorrep" element={<VisitorReport />} />
              <Route path="/visitorlog" element={<VisitorLogCreation />} />
              <Route path="/visitorlogrep" element={<VisitorLogReport />} />
              <Route path="/user" element={<UserCreations />} />
              <Route path="/userrep" element={<UserReport />} />
              <Route path="/master" element={<Masters />} />

              <Route path="/excel" element={<ExcelComponent />} />
              <Route path="/us" element={<User />} />
              <Route path="/rep" element={<ReportData />} />
              <Route path="/ob" element={<ObjectDetection />} />
            </Routes>
          </div>
        </div>
      </div>

      <ToastNotification />
    </Router>
  );
}
