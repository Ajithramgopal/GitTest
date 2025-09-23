import { useNavigate } from "react-router-dom";

export default function EditButton({ redirectPath, row }) {
  const navigate = useNavigate();

  const handleRedirect = (customUrl = redirectPath, stateData = null) => {
    navigate(customUrl, stateData ? { state: stateData } : {});
  };

  const handleEdit = () => {
    handleRedirect(redirectPath, { editData: row });
  };

  return (
    <div>
      <button className="edit-btn" onClick={handleEdit}>
        ✏️
      </button>
    </div>
  );
}
