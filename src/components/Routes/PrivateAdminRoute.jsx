import { introspect } from "@/services/authService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingDotsFullScreen from "../Loading/LoadingDotsFullScreen";

function PrivateAdminRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector((state) => state.user.userInfo);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }

    const fetchIntrospect = async () => {
      const { statusCode, data } = await introspect();

      if (statusCode === 200 && data.roles.includes("ADMIN")) {
        setIsAuthenticated(true);
      } else if (!statusCode) {
        navigate("/server-error");
      } else {
        navigate("/forbidden");
      }

      setIsLoading(false);
    };

    fetchIntrospect();
  }, [userState, navigate, location]);

  if (isLoading) {
    return <LoadingDotsFullScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default PrivateAdminRoute;
