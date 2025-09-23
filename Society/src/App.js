import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import OrgCreation from "./pages/Organization/Org";
import OrgReport from "./pages/Organization/OrgReport";
import BlockCreation from "./pages/Block/BlockCreation";
import BlockReport from "./pages/Block/BlockReport";
import FlatCreation from "./pages/Flat/FlatCreation";
import FlatReport from "./pages/Flat/FlatReport";
import UserCreation from "./pages/Users/Usercreation";
import UserReport from "./pages/Users/UserReport";
import TicketCreation from "./pages/Ticket/TicketCreation";
import TicketReport from "./pages/Ticket/TicketReport";
import AnnouceCreation from "./pages/Announcements/AnnouceCreation";
import AnnouceReport from "./pages/Announcements/AnnouceReport";
import MaintenanceCreation from "./pages/Maintenance/MaintenanceCreation";
import MaintenanceReport from "./pages/Maintenance/MaintenanceReport";
import FacilityBookingCreation from "./pages/FacilityBooking/FacilityBookingCreation";
import FacilityBookingReport from "./pages/FacilityBooking/FacilityBookingReport";
import VisitorCreation from "./pages/Visitors/VisitorCreation";
import VisitorReport from "./pages/Visitors/VisitorReport";
import ExcelUpload from "./Excel/ExcelUpload.js";
import SearchBox from "./pages/SearchBox";
import ImageUploader from "./ImageUploader";
import Notification from "./Notification";
import LoginPage from "./pages/Login/LoginPage";
import { useEffect, useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./ThemeContext"; // ✅
import ThemeProvider from "./ThemeContext"; // ✅
import FacilitiesCreation from "./pages/Facilities/FacilitiesCreation";
import FacilitiesReport from "./pages/Facilities/FacilitiesReport";
import SelectList from "./pages/Visitors/SelectList";
import PDFGenerator from "./Pdf/PDFGenerator.js";
import MyComponent from "./MyComponent";
import MyMap from "./Map/MyMap.js";
import PaymentComponent from "./Payment/PaymentComponent.js";
import FormingData from "./FormingData.js";
import FormingShow from "./FormingShow.js";
import UserList from "./Redux/userList.js";
import SomeComponent from "./SomeComponent.js";
import CustomPie from "./Dashboard/CustomPie.js";
import Whatsapp from "./WhatApp/Whatapp.js";
import isLogged from "./pages/CustomHook/isLogged.js";
import useGetApi from "./pages/CustomHook/useGetApi.js";
import UserData from "./UserData.js";
import ExportExcel from "./Excel/ExportExcel.js";
import Customers from "./Customers.js";
import UsersForm from "./UsersForm.js";
import YaanarUser from "./YaanarUser.js";
import YTUser from "./YTUser.tsx";
import CreateUser from "./CreateUser.js";
import CreateUserRep from "./CreateUserRep.js";
import CreateType from "./CreateType.tsx";
import CreateRep from "./CreateRep.tsx";
import RedTest from "./XRedux/RedTest.js";
import UserForm from "./XRedux/UserForm.js";
import Login from "./Login.js";
export const dataContext = createContext();

function App() {
  const { getData, getLoading } = useGetApi("user", { username: "Admin" });

  // ✅ Destructure safely
  const [
    {
      userid,
      username,
      password,
      block,
      flat,
      email,
      organizationid,
      isLogged = true,
    } = {},
  ] = getData;

  const data = {
    userid,
    username,
    password,
    block,
    flat,
    email,
    organizationid,
    isLogged,
  };

  return (
    <ThemeProvider>
      <dataContext.Provider value={data}>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <TopNavbar />
            <div style={{ display: "flex", flex: 1 }}>
              <Sidebar />
              <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <Routes>
                  <Route path="/" element={<Login />} />

                  <Route path="/org" element={<OrgCreation />} />

                  <Route path="/orgrep" element={<OrgReport />} />
                  <Route path="/block" element={<BlockCreation />} />
                  <Route path="/blockrep" element={<BlockReport />} />
                  <Route path="/flat" element={<FlatCreation />} />
                  <Route path="/flatrep" element={<FlatReport />} />
                  <Route path="/facilitymas" element={<FacilitiesCreation />} />
                  <Route
                    path="/facilitymasrep"
                    element={<FacilitiesReport />}
                  />
                  <Route path="/user" element={<UserCreation />} />
                  <Route path="/userrep" element={<UserReport />} />
                  <Route path="/tic" element={<TicketCreation />} />
                  <Route path="/ticrep" element={<TicketReport />} />
                  <Route
                    path="/maintenance"
                    element={<MaintenanceCreation />}
                  />
                  <Route
                    path="/maintenancerep"
                    element={<MaintenanceReport />}
                  />
                  <Route
                    path="/facility"
                    element={<FacilityBookingCreation />}
                  />
                  <Route
                    path="/facilityrep"
                    element={<FacilityBookingReport />}
                  />
                  <Route path="/announce" element={<AnnouceCreation />} />
                  <Route path="/announcerep" element={<AnnouceReport />} />
                  <Route path="/visitor" element={<VisitorCreation />} />
                  <Route path="/visitorrep" element={<VisitorReport />} />
                  <Route path="/up" element={<ExcelUpload />} />
                  <Route path="/se" element={<SearchBox />} />
                  <Route path="/im" element={<ImageUploader />} />
                  <Route path="/no" element={<Notification />} />
                  <Route path="/select" element={<SelectList />} />
                  <Route path="/pdf" element={<PDFGenerator />} />
                  <Route path="/my" element={<MyComponent />} />
                  <Route path="/map" element={<MyMap />} />
                  <Route path="/pay" element={<PaymentComponent />} />
                  <Route path="/for" element={<FormingData />} />
                  <Route path="/show" element={<FormingShow />} />
                  <Route path="/us" element={<UserList />} />
                  <Route path="/some" element={<SomeComponent />} />

                  <Route path="/pie" element={<CustomPie />} />
                  <Route path="/wt" element={<Whatsapp />} />
                  <Route path="/ex" element={<ExportExcel />} />
                  <Route path="/cus" element={<Customers />} />
                  <Route path="/form" element={<UsersForm />} />
                  <Route path="/yt" element={<YaanarUser />} />
                  <Route path="/ytt" element={<YTUser />} />
                  <Route path="/cre" element={<CreateUser />} />
                  <Route path="/rep" element={<CreateUserRep />} />
                  <Route path="/aj" element={<CreateType />} />
                  <Route path="/aji" element={<CreateRep />} />
                  <Route path="/red" element={<RedTest />} />
                  <Route path="/uf" element={<UserForm />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </dataContext.Provider>
    </ThemeProvider>
  );
}

export default App;
