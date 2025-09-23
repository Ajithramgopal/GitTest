import "../Navbar/TopNavbar.css";

export default function TopNavbar() {
  return (
    <div className="header">
      <h1>Society</h1>
      <div className="parent">
        <div className="child">
          <button>Profile</button>
          <div className="card">
            <p>My Account</p>
            <p>Settings</p>
          </div>
        </div>
        <div className="child">
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
}
