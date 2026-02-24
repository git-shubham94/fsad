import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Navbar from './components/layout/Navbar';
import ParticleBackground from './components/ui/ParticleBackground';
import { useAppContext } from './context/AppContext';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student"
          element={
            <PrivateRoute role="student">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <ParticleBackground />
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, role }) {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
