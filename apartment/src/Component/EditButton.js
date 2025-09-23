import { useNavigate } from "react-router-dom";

export default function EditButton({ redirectPath, row }) {
  const navigate = useNavigate();

  const handleRedirect = (customUrl = redirectPath, stateData = null) => {
    if (stateData) {
      navigate(customUrl, { state: stateData }); // ✅ correct way
    } else {
      navigate(customUrl); // ✅ no extra {}
    }
  };

  const handleEdit = () => {
    handleRedirect(redirectPath, row); // pass row directly
  };

  return (
    <button className="edit-btn" onClick={handleEdit}>
      ✏️
    </button>
  );
}
