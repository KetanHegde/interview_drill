import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DrillDetail from "./pages/DrillDetail";
import History from "./pages/History";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/drill/:id"
              element={
                <ProtectedRoute>
                  <DrillDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
