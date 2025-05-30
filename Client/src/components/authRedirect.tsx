import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = Cookies.get("template-app-token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return !token ? <>{children}</> : null;
};

export default AuthRedirect;