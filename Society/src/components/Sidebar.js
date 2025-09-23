import { Link } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = { color: "#fff", textDecoration: "none" };

  return (
    <div
      style={{
        width: "200px",
        background: "#2c3e50",
        height: "100vh",
        color: "white",
        padding: "20px",
        position: "sticky",
        top: "60px", // Push below the top navbar
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        <Link to="/orgrep" style={linkStyle}>
          Organization
        </Link>
        <Link to="/" style={linkStyle}>
          Contact
        </Link>
        <Link to="/userrep" style={linkStyle}>
          User
        </Link>
        <Link to="/ticrep" style={linkStyle}>
          Ticket
        </Link>
        <Link to="/blockrep" style={linkStyle}>
          Block
        </Link>
        <Link to="/flatrep" style={linkStyle}>
          Flat
        </Link>
        <Link to="/facilitymasrep" style={linkStyle}>
          Facility Master
        </Link>
        <Link to="/facilityrep" style={linkStyle}>
          Facility
        </Link>
        <Link to="/visitorrep" style={linkStyle}>
          Visitor
        </Link>
        <Link to="/maintenancerep" style={linkStyle}>
          Maintenance
        </Link>
        <Link to="/announcerep" style={linkStyle}>
          Announcement
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
