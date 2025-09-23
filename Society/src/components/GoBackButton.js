import { useNavigate } from "react-router-dom";

export default function GoBackButton({ redirectPath }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <div>
      <button onClick={handleClick}>🔙 Back</button>
    </div>
  );
}
