import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export default function IsAuthenticate({ role, children }) {
  const { user } = useContext(UserContext);

  if (user?.role === role) {
    return children;
  }

  return <h3>🚫 You are not authorized to view this page.</h3>;
}
