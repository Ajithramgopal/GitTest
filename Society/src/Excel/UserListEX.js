import { downloadExcel } from "./utils/downloadExcel";
import useGetApi from "../pages/CustomHook/useGetApi";

export default function UserListEX() {
  const { getData, getLoading, getError } = useGetApi("user");

  if (getLoading) return <p>Loading...</p>;
  if (getError) return <p>Error: {getError}</p>;

  return (
    <div>
      <h2>User List</h2>
      <button onClick={() => downloadExcel(getData, "UserData.xlsx", "Users")}>
        Download Excel
      </button>

      <ul>
        {getData.map((user) => (
          <li key={user.userid}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
