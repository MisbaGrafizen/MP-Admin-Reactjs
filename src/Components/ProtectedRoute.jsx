import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading, true = authorized, false = not authorized
  const token = Cookies.get('authToken');

  useEffect(() => {
    if (token) {
      // Optionally validate token here (e.g., check expiry, make API call)
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [token]);

  if (isAuthorized === null) {
    return <p>Loading...</p>; // Show a loading message while checking the token
  }

  if (!isAuthorized) {
    console.error("No auth token found, redirecting to login.");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
