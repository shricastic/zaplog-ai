import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { environment } from "@/env";

const OAuth = ({ type }: { type: "signup" | "signin" }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get("code");

      if (code) {
        setLoading(true);
        try {
          const response = await fetch(
            `${environment.BACKEND_URL}/api/v1/user/signin/google/callback?code=${code}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          );

          if (!response.ok) {
            throw new Error("Failed to authenticate");
          }

          const data = await response.json();
          login(data.token);
          localStorage.setItem("zaplog-token", data.token);
          navigate("/blogs");
        } catch (err) {
          setError("Authentication failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [location, login, navigate]);

  const handleGoogleLogin = () => {
    setLoading(true);
    try {
      const googleClientId = environment.GOOGLE_CLIENT_ID;
      const redirectUri = environment.GOOGLE_REDIRECT_URI;

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
        {
          client_id: googleClientId,
          redirect_uri: redirectUri,
          response_type: "code",
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      )}`;

      window.location.href = googleAuthUrl;
    } catch (err) {
      setError("Failed to initiate login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col ">
      <div className="flex justify-center">
        <div className="w-full max-w-md px-6">
          <div className="text-3xl font-bold mb-8 text-center">
            {type === "signup" ? "Create New Account" : "Login to your Account"}
          </div>

          {error}

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-700 mt-3 rounded-lg font-medium py-2 px-4 flex items-center justify-center hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                {type === "signup"
                  ? "Sign up with Google"
                  : "Sign in with Google"}
              </>
            )}
          </button>

          <div className="text-gray-500 mt-4 text-center">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link
              to={type === "signin" ? "/signup" : "/login"}
              className="text-blue-600 hover:underline"
            >
              {type === "signin" ? "Sign Up" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuth;
