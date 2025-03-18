import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingDotsFullScreen from "../Loading/LoadingDotsFullScreen";
import useAuthorization from "@/hooks/useAuthorization";

function PrivateAdminRoute({ children }) {
  const userState = useSelector((state) => state.user.userInfo);
  const { isAuthorized, isLoading } = useAuthorization("ADMIN");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
  }, [userState, navigate, location]);

  if (isLoading) {
    return <LoadingDotsFullScreen />;
  }

  if (!isAuthorized) {
    navigate("/forbidden");
  }

  return children;
}

export default PrivateAdminRoute;
