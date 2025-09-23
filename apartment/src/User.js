import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addInc } from "./userSlice";
export default function User() {
  const [user, setUser] = useState({
    userName: "",
    status: "",
    upload: null,
    role: "",
    email: "",
    mobile: "",
    block: "",
    flat: "",
    password: "",
    conPassword: "",
    createdBy: null,
    createdDate: null,
    updatedBy: null,
    updatedDate: null,
    organizationId: null,
  });

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.userInfo
    // console.log("data", state.adding.addNumber)
  );

  console.log("data", data);
  const handleChange = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  console.log("user", user);

  let error = {};

  if (!user.userName) {
    error.userName = "Please enter username";
  }

  console.log("error.userName", error.userName);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => [...prev, user]);
    // dispatch(addUser(userData));
    setUser({
      userName: "",
      status: "",
      upload: null,
      role: "",
      email: "",
      mobile: "",
      block: "",
      flat: "",
      password: "",
      conPassword: "",
    });
    // navigate("/rep", { state: userData });
  };

  console.log("userData", userData);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="userName"
          value={user.userName}
          onChange={(e) => handleChange("userName", e.target.value)}
        />
        <p>{error.userName}</p>
        <button>Submit</button>
      </form>

      <button onClick={() => dispatch(addInc(5))}>+</button>
      <p>{data}</p>
    </>
  );
}
