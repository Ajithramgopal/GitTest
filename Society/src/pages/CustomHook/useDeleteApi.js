// import axios from "axios";
// import { useState } from "react";
// export default function useDeleteApi(table_name) {
//   const [delWaiting, setDelWaiting] = useState(false);
//   const [delError, setDelError] = useState(null);

//   const API_URL = `https://ollreuemkwgrrujfgbiw.supabase.co/rest/v1/${table_name}`;
//   const API_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbHJldWVta3dncnJ1amZnYml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODM4MTgsImV4cCI6MjA2ODc1OTgxOH0.koHYVyNyb3LT9M6HgwxCjCJ_4HIeWn5zcdWq6O1YIdU";

//   const HEADERS = {
//     apikey: API_KEY,
//     Authorization: `Bearer ${API_KEY}`,
//     "Content-Type": "application/json",
//     Prefer: "return=representation",
//   };

//   const deleteItem = async (col_name, col_id) => {
//     setDelWaiting(true);
//     try {
//       const res = await axios.delete(`${API_URL}?${col_name}=eq.${col_id}`, {
//         headers: HEADERS,
//       });
//       alert("Item deleted successfully");
//       return res.data;
//     } catch (err) {
//       console.error("Delete error:", err);
//       setDelError(err.message);
//       alert("Failed to delete");
//       return null;
//     } finally {
//       setDelWaiting(false);
//     }
//   };

//   return { deleteItem, delWaiting, delError };
// }

import axios from "axios";
import { useState } from "react";
import useApiUrl from "./useApiUrl";
export default function useDeleteApi(table_name) {
  const [delWaiting, setDelWaiting] = useState(false);
  const [delError, setDelError] = useState(null);

  const { API_URL, HEADERS } = useApiUrl();
  const DEL_API_URL = `${API_URL}/${table_name}`;
  const deleteItem = async (col_name, col_id) => {
    setDelWaiting(true);
    try {
      const res = await axios.delete(
        `${DEL_API_URL}?${col_name}=eq.${col_id}`,
        {
          headers: HEADERS,
        }
      );
      alert("Item deleted successfully");
      return res.data;
    } catch (err) {
      console.error("Delete error:", err);
      setDelError(err.message);
      alert("Failed to delete");
      return null;
    } finally {
      setDelWaiting(false);
    }
  };

  return { deleteItem, delWaiting, delError };
}
