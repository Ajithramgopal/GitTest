import { useState } from "react";
import "./App.css";
import Report from "./Report";
import Form from "./Form";
function App() {
  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();

  // dropdown states
  const [showMasters, setShowMasters] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="common">
        {/* Sidebar */}
        <div className={`sideBar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="nav-h1">Society</div>

          {/* Masters Dropdown */}
          <div
            className="nav-item"
            onClick={() => setShowMasters(!showMasters)}
          >
            Masters <span className="arrow">{showMasters ? "▲" : "▼"}</span>
          </div>
          {showMasters && (
            <div className="sub-menu">
              <div>Employee</div>
              <div>Staff</div>
              <div>Owner</div>
            </div>
          )}

          {/* Customer Dropdown */}
          <div
            className="nav-item"
            onClick={() => setShowCustomer(!showCustomer)}
          >
            Customer <span className="arrow">{showCustomer ? "▲" : "▼"}</span>
          </div>
          {showCustomer && (
            <div className="sub-menu">
              <div>Profile</div>
              <div>Orders</div>
              <div>Payments</div>
            </div>
          )}

          {/* Static Links */}
          <div className="nav-item">Block</div>
          <div className="nav-item">Flat</div>
        </div>

        {/* Right Side */}
        <div className="navParent">
          {/* Top Nav Bar */}
          <div className="topNavBar">
            <button
              className={`hamburger ${sidebarOpen ? "" : "closed"}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <div className="topNavBarInput">
              <input type="search" placeholder="Search..." />
            </div>
            <div className="topNavBarChild">
              <div>Profile</div>
              <div>Setting</div>
              <div>Logout</div>
            </div>
          </div>

          {/* Page Header */}
          <div className="headers">
            <div>
              <p>Dashboard</p>
            </div>
            <div className="headers-button">
              <button className="button">Create</button>
            </div>
          </div>

          {/* Page Content */}
          <div className="sections">
            {/* <p>Main content goes here...</p> */}
            {/* <Report /> */}
            <Form />
          </div>

          {/* Footer */}
          <div className="footer">
            <p>Vingaya Technology @ {currentYear}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
