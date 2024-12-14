import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import VehicleDashboard from './components/dashboard/VehicleDashboard';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* Protected route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <VehicleDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
