export default function DeleteButton({
  columns,
  row,
  deleteItem,
  refreshData,
}) {
  const handleDelete = async (primaryKeyValue) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deleteItem(columns[0].accessor, primaryKeyValue);
      refreshData(); // Call parent refetch
    }
  };

  return (
    <div>
      <button
        className="delete-btn"
        onClick={() => handleDelete(row[columns[0].accessor])}
      >
        🗑️
      </button>
    </div>
  );
}
