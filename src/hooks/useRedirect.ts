import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = (condition: boolean, redirectPath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (condition) {
      navigate(redirectPath);
    }
  }, [condition, navigate, redirectPath]);
};

export default useRedirect;
