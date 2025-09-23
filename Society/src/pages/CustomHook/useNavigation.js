import { useNavigate } from "react-router-dom";

export default function useNavigation(defaultUrl = "/") {
  const navigate = useNavigate();

  const handleRedirect = (customUrl = defaultUrl, stateData = null) => {
    if (stateData) {
      navigate(customUrl, { state: stateData });
    } else {
      navigate(customUrl);
    }
  };

  return { handleRedirect };
}
