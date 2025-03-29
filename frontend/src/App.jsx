
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import AppRoutes from './routes'; // Import the route definitions
import './App.css'; // Assuming component-specific styles are here

// Basic Navigation component
const Navigation = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');

  // Basic logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // Force a refresh or navigate to login to clear state
    window.location.href = '/login'; // Simple redirect, consider useNavigate for better SPA behavior
  };

  return (
    <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
        {!isAuthenticated && location.pathname !== '/login' && (
          <li><Link to="/login">Login</Link></li>
        )}
        {!isAuthenticated && location.pathname !== '/register' && (
          <li><Link to="/register">Register</Link></li>
        )}
        {isAuthenticated && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};


function App() {
  return (
    <div className="App">
      <header>
        <h1>Task Management App</h1>
        <Navigation /> {/* Add the Navigation component */}
      </header>
      <main>
        {/* Render the defined routes */}
        <AppRoutes />
      </main>
      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} Task Management App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
