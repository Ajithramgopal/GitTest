
import axios from "axios";
import { useState } from "react";
import useApiUrl from "./useApiUrl";
export default function usePutApi(table_name) {
  const [waiting, setWaiting] = useState(false);
  const [err, setErr] = useState(null);

  const { API_URL, HEADERS } = useApiUrl();
  const PUT_API_URL = `${API_URL}/${table_name}`;

  // ✅ Reusable PATCH/PUT method
  const updateItem = async (col_name, col_id, payload) => {
    setWaiting(true);
    try {
      const res = await axios.patch(
        `${PUT_API_URL}?${col_name}=eq.${col_id}`,
        payload, // sending updated data
        { headers: HEADERS }
      );
      alert("Item updated successfully");
      return res.data;
    } catch (err) {
      console.error("Update error:", err);
      setErr(err.message);
      alert("Failed to update");
      return null;
    } finally {
      setWaiting(false);
    }
  };

  return { updateItem, waiting, err };
}
