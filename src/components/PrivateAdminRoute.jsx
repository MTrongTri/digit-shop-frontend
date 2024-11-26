import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateAdminRoute({ children }) {
  const userState = useSelector((state) => state.user.userInfo);

  const location = useLocation();

  if (!userState) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!userState?.roles.includes("ADMIN")) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

export default PrivateAdminRoute;
