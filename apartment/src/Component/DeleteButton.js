import useApi from "./useApi";
export default function DeleteButton({ id, tableName }) {
  const { delData, fetchData } = useApi(tableName);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const result = await delData(id);
      if (result) {
        fetchData(); // refresh after delete
      }
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      🗑️
    </button>
  );
}
