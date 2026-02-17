import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import MyCollectionPage from './pages/MyCollectionPage'; 
import WelcomePage from './pages/WelcomePage';
import ProtectedRoute from './routing/ProtectedRoute';
import { useAuth } from './auth/authContext';
import BillboardPage from './pages/BillboardPage'; 
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminMoviesPage from './pages/AdminMoviesPage';

function App() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Routes>
      <Route element={<AppLayout />}>
        
        <Route path="/" element={<WelcomePage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        
        <Route path="/movies" element={
            <ProtectedRoute><MyCollectionPage /></ProtectedRoute>
        } />
        
        <Route path="/billboard" element={
            <ProtectedRoute><BillboardPage /></ProtectedRoute>
        } />

        
        <Route path="/admin" element={
            <ProtectedRoute>
                {isAdmin ? <AdminDashboardPage /> : <Navigate to="/movies" />}
            </ProtectedRoute>
        } />

        
        <Route path="/admin-movies" element={
            <ProtectedRoute>
                {isAdmin ? <AdminMoviesPage /> : <Navigate to="/movies" />}
            </ProtectedRoute>
        } />

        <Route path="*" element={<p className="card">404 - Página no encontrada</p>} />
      </Route>
    </Routes>
  );
}

export default App;