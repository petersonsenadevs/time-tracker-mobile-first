
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import WorkDays from "./pages/WorkDays";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AuthenticatedRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isCheckingAuth } = useAuth();
  
  // Mostrar loader mientras se verifica la autenticación
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Verificando sesión...</p>
        </div>
      </div>
    );
  }
  
  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    console.log('User already authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  // Si no está autenticado, mostrar la página de login/register
  console.log('User not authenticated, showing login/register page');
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  // Mostrar loader mientras se verifica la autenticación inicial
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/login" 
        element={
          <AuthenticatedRedirect>
            <Login />
          </AuthenticatedRedirect>
        } 
      />
      <Route 
        path="/register" 
        element={
          <AuthenticatedRedirect>
            <Register />
          </AuthenticatedRedirect>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/workdays" 
        element={
          <ProtectedRoute>
            <WorkDays />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/statistics" 
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="*" 
        element={
          <NotFound isAuthenticated={isAuthenticated} />
        } 
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
