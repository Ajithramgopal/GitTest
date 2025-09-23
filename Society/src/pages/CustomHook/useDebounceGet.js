import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "./useDebounce";

export default function useDebounceGet({
  tableName,
  searchField,
  delay = 500,
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const debouncedSearch = useDebounce(search, delay);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://ollreuemkwgrrujfgbiw.supabase.co/rest/v1/${tableName}`;
        let queryParams = "";

        if (debouncedSearch.trim() !== "") {
          queryParams = `?${searchField}=ilike.*${debouncedSearch}*`;
        } else {
          queryParams = `?limit=10`;
        }

        const res = await axios.get(`${url}${queryParams}`, {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbHJldWVta3dncnJ1amZnYml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODM4MTgsImV4cCI6MjA2ODc1OTgxOH0.koHYVyNyb3LT9M6HgwxCjCJ_4HIeWn5zcdWq6O1YIdU",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbHJldWVta3dncnJ1amZnYml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODM4MTgsImV4cCI6MjA2ODc1OTgxOH0.koHYVyNyb3LT9M6HgwxCjCJ_4HIeWn5zcdWq6O1YIdU",
          },
        });

        setResults(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [debouncedSearch, tableName, searchField]);

  return { search, setSearch, results };
}
