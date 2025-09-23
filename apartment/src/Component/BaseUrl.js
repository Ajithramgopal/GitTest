export default function BaseUrl() {
  const url = "http://localhost:5000/api";
  const storeHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return { url, storeHeaders };
}
