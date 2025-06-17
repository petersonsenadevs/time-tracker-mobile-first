
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

interface NotFoundProps {
  isAuthenticated: boolean;
}

const NotFound = ({ isAuthenticated }: NotFoundProps) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      "Auth status:",
      isAuthenticated
    );
  }, [location.pathname, isAuthenticated]);

  // Si el usuario está autenticado pero accede a una ruta inexistente, redirigir al dashboard
  if (isAuthenticated) {
    console.log('Authenticated user on 404 page, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Si el usuario no está autenticado y accede a una ruta inexistente, redirigir al login
  console.log('Unauthenticated user on 404 page, redirecting to login');
  return <Navigate to="/login" replace />;
};

export default NotFound;
