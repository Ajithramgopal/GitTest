import { Link } from "react-router-dom";
import IsAuthenticate from "../Component/IsAuthenticate";
import "./Sidebar.css";

const Sidebar = () => {
  const linkStyle = { color: "#fff", textDecoration: "none" };
  return (
    <div className="sidebar">
      <div className="nav">
        {/* <IsAuthenticate role="Admin"> */}
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        <Link to="/userrep" style={linkStyle}>
          User
        </Link>
        <Link to="/" style={linkStyle}>
          Login
        </Link>
        <Link to="/announcerep" style={linkStyle}>
          Announcement
        </Link>
        <Link to="/residentrep" style={linkStyle}>
          Resident
        </Link>
        <Link to="/employeerep" style={linkStyle}>
          Employee
        </Link>

        <Link to="/facilitybookrep" style={linkStyle}>
          FacilityBook
        </Link>

        <Link to="/maintenanceduerep" style={linkStyle}>
          MaintenanceDue
        </Link>
        <Link to="/paymentrep" style={linkStyle}>
          Payment
        </Link>
        <Link to="/maintenancerep" style={linkStyle}>
          Maintenance
        </Link>
        <Link to="/maintenanceassignrep" style={linkStyle}>
          Maintenance Assign
        </Link>
        <Link to="/orgrep" style={linkStyle}>
          Organization
        </Link>

        <Link to="/visitorrep" style={linkStyle}>
          Visitor
        </Link>
        <Link to="/visitorlogrep" style={linkStyle}>
          Visitorlog
        </Link>
        <Link to="/gateentryrep" style={linkStyle}>
          Gate Entry
        </Link>
        <Link to="/master" style={linkStyle}>
          Master
        </Link>
        <Link to="/log" style={linkStyle}>
          Logout
        </Link>
        {/* </IsAuthenticate> */}
      </div>
    </div>
  );
};

export default Sidebar;
