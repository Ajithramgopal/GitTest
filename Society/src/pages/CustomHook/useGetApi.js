// import axios from "axios";
// import { useEffect, useState } from "react";
// import useApiUrl from "./useApiUrl";

// export default function useGetApi(table_name) {
//   const [getData, setGetData] = useState([]);
//   const [getLoading, setGetLoading] = useState(true);
//   const [getError, setGetError] = useState(null);

//   const { API_URL, HEADERS } = useApiUrl();
//   const GET_API_URL = `${API_URL}/${table_name}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       setGetLoading(true);
//       try {
//         const response = await axios.get(GET_API_URL, {
//           headers: HEADERS, // ✅ Correct usage here
//         });
//         setGetData(response.data);
//       } catch (error) {
//         setGetError(error.message || "Unknown error occurred");
//       } finally {
//         setGetLoading(false);
//       }
//     };

//     fetchData();
//   }, [GET_API_URL]);

//   return { getData, getLoading, getError };
// }

import axios from "axios";
import { useEffect, useState } from "react";
import useApiUrl from "./useApiUrl";

export default function useGetApi(table_name, filter = {}) {
  const [getData, setGetData] = useState([]);
  const [getLoading, setGetLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  const { API_URL, HEADERS } = useApiUrl();
  const GET_API_URL = `${API_URL}/${table_name}`;

  useEffect(() => {
    const fetchData = async () => {
      setGetLoading(true);
      try {
        // ✅ Build query string dynamically
        let url = GET_API_URL;

        if (Object.keys(filter).length > 0) {
          const query = Object.entries(filter)
            .map(([key, value]) => `${key}=eq.${value}`)
            .join("&");
          url += `?${query}`;
        }

        const response = await axios.get(url, { headers: HEADERS });
        setGetData(response.data);
      } catch (error) {
        setGetError(error.message || "Unknown error occurred");
      } finally {
        setGetLoading(false);
      }
    };

    fetchData();
  }, [GET_API_URL, JSON.stringify(filter)]);

  return { getData, getLoading, getError };
}
