
import axios from "axios";
import { useState } from "react";
import useApiUrl from "./useApiUrl";

export default function usePostApi(table_name) {
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const { API_URL, HEADERS } = useApiUrl();
  // ✅ Ensure table_name is passed correctly
  const POST_API_URL = `${API_URL}/${table_name}`;

  const postData = async (payload) => {
    setPostLoading(true);
    setPostError(null);
    setResponseData(null);

    try {
      const response = await axios.post(POST_API_URL, payload, {
        headers: HEADERS,
      });
      setResponseData(response.data);
      console.log("✅ Posted successfully:", response.data);
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.statusText ||
        error.message;
      setPostError(msg);
      console.error("❌ Error while posting:", msg);
      return null; // ✅ Return null on failure
    } finally {
      setPostLoading(false);
    }
  };

  return { postData, postLoading, postError, responseData };
}
