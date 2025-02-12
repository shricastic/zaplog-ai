import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

const OAuthCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);
      localStorage.setItem("zaplog-token", token);
      navigate("/blogs");
    } else {
      setError("Authentication failed. Please try again.");
    }
  }, [location, login, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {error ? <p className="text-red-500">{error}</p> : <p>Authenticating...</p>}
    </div>
  );
};

export default OAuthCallback;
