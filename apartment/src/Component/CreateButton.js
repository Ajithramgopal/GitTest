import { useNavigate } from "react-router-dom";

export default function CreateButton({ redirect }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirect);
  };

  return (
    <div>
      <button onClick={handleClick}>Create</button>
    </div>
  );
}
