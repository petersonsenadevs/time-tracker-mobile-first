
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isCheckingAuth, token } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Auth state:', { isAuthenticated, isCheckingAuth, hasToken: !!token });
  
  // Mientras se verifica la autenticación, mostrar loading
  if (isCheckingAuth) {
    console.log('Checking authentication status...');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Si no hay token o no está autenticado, redirigir a login
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login from:', location.pathname);
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  console.log('User is authenticated, showing protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
