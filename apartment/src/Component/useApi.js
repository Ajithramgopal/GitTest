import { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "./BaseUrl";

export default function useApi(table, particularId = null, type) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { url, storeHeaders } = BaseUrl();

  const fetchData = async () => {
    try {
      const endpoint = particularId
        ? `${url}/${table}/${particularId}`
        : `${url}/${table}`;
      const response = await axios.get(endpoint, {
        headers: storeHeaders,
      });
      setData(response.data);
    } catch (err) {
      setError("Error fetching data: " + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table, particularId]);

  const postData = async (payload = {}, customType = null) => {
    try {
      const endpoint = customType
        ? `${url}/${table}/${customType}`
        : `${url}/${table}`;

      const response = await axios.post(endpoint, payload, {
        headers: storeHeaders,
      });

      // Optional: Refresh list after post
      await fetchData();

      return response.data;
    } catch (err) {
      setError("Error posting data: " + err.message);
      return null;
    }
  };

  const putData = async (payId, payload = {}) => {
    try {
      const response = await axios.put(`${url}/${table}/${payId}`, payload, {
        headers: storeHeaders,
      });
      return response.data;
    } catch (err) {
      setError("Error updating data: " + err.message);
    }
  };
  const delData = async (payId) => {
    if (window.confirm("Do you want to delete this record?")) {
      try {
        const response = await axios.delete(`${url}/${table}/${payId}`, {
          headers: storeHeaders,
        });
        return response.data;
      } catch (err) {
        setError("Error deleting data: " + err.message);
      }
    }
  };

  return { data, fetchData, postData, delData, putData, error };
}
