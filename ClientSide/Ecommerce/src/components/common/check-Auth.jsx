import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function CheckAuth() {
  const location = useLocation();
  const Authenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

  // If not authenticated, redirect to login unless already on login/register
  if (!Authenticated && !(location.pathname.includes('/auth/Register') || location.pathname.includes('/auth/Login'))) {
    return <Navigate to="/Login" replace />;
  }

  // If authenticated, prevent access to login/register and redirect to shop
  if (Authenticated && (location.pathname.includes('/auth/Login') || location.pathname.includes('/auth/Register'))) {
    return <Navigate to="/shop" replace />;
  }

  // If none of the above, render the requested route
  return <Outlet />;
}

export default CheckAuth;
