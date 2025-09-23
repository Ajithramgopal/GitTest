import useGetApi from "../pages/CustomHook/useGetApi";
import { downloadExcel } from "../utils/downloadExcel";
export default function UserData({ username }) {
  const { getData, getLoading } = useGetApi("user", { username });

  if (getLoading) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={() =>
          downloadExcel(getData, `${username}_Data.xlsx`, "UserData")
        }
      >
        Download {username}'s Data
      </button>
    </div>
  );
}
