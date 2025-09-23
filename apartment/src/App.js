
import "../src/Css/App.css";
import { UserContext } from "./Context/UserContext.js";
import { useState } from "react";
import RoutesPath from "./Component/RoutesPath.js";
function App() {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser,
      }}
    >
      <RoutesPath />
    </UserContext.Provider>
  );
}

export default App;
