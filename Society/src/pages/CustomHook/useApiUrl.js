export default function useApiUrl() {
  const API_URL = "https://ollreuemkwgrrujfgbiw.supabase.co/rest/v1";
  const API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sbHJldWVta3dncnJ1amZnYml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxODM4MTgsImV4cCI6MjA2ODc1OTgxOH0.koHYVyNyb3LT9M6HgwxCjCJ_4HIeWn5zcdWq6O1YIdU";
  const HEADERS = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  return { API_URL, API_KEY, HEADERS };
}
