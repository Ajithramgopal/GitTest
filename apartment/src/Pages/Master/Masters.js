import "../Master/Masters.css";
import { Link } from "react-router-dom";

export default function Masters() {
  return (
    <div className="master-container">
      <h2>Masters List</h2>
      <ul className="master-list">
        <li>
          <Link to="/blockrep">Block</Link>
        </li>
        <li>
          <Link to="/flatrep">Flat</Link>
        </li>
        <li>
          <Link to="/categoryrep">Category</Link>
        </li>
        <li>
          <Link to="/statusrep">Status</Link>
        </li>
        <li>
          <Link to="/rolerep">Role</Link>
        </li>
        <li>
          <Link to="/facilityrep">Facility</Link>
        </li>

        <li>
          <Link to="/visitorpurposerep">Purpose</Link>
        </li>
      </ul>
    </div>
  );
}
