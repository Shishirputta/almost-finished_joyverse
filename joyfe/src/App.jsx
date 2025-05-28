import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { LoginForm } from './components/LoginForm';
import BoggleGame from './games/BoggleGame';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { GameSelection } from './components/GameSelection';
import { useAppData } from './hooks/useAppData';
import FruitGuesser from './games/fruitguesser';
import MemoryGame from './games/MemoryGame';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MemorySequenceGame from './games/MemorySequence';
import './styles/App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const { admins, children, adminFeedback } = useAppData();

  const handleLogin = (role, username) => {
    setUserRole(role);
    setUserData({ username });
    setShowLanding(false);
  };

  const handleLoginClick = () => {
    setShowLanding(false);
  };

  const handleBackToLanding = () => {
    setShowLanding(true);
    setUserRole(null);
    setUserData(null);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="app-content">
          {showLanding ? (
            <LandingPage onLoginClick={handleLoginClick} />
          ) : !userRole ? (
            <div className="login-section">
              <div className="header-container">
                <BookOpen size={48} className="text-blue-600" />
                <h1 className="app-title">
                  Reading Adventure
                </h1>
              </div>

              <p className="app-description">
                Welcome to your special learning journey! Let's make reading fun
                together.
              </p>

              <div className="login-card">
                <h2 className="login-title">
                  Sign In to Continue
                </h2>
                <LoginForm
                  onLogin={handleLogin}
                  admins={admins}
                  children={children}
                />
                <button
                  onClick={handleBackToLanding}
                  className="back-button"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <div className="dashboard-section">
              <Routes>
                <Route
                  path="/"
                  element={
                    userRole === 'superadmin' ? (
                      <SuperAdminDashboard adminFeedback={adminFeedback} />
                    ) : userRole === 'admin' ? (
                      <AdminDashboard adminUsername={userData.username} />
                    ) : (
                      <GameSelection />
                    )
                  }
                />
                <Route
                  path="/boggle"
                  element={<BoggleGame username={userData.username} />}
                />
                <Route
                  path="/fruit-guesser"
                  element={<FruitGuesser username={userData.username} />}
                />
                <Route
                  path="/memory-game"
                  element={<MemoryGame username={userData.username} />}
                />
                <Route
                  path="/memory-sequence"
                  element={<MemorySequenceGame username={userData.username} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>

              <button
                onClick={handleBackToLanding}
                className="signout-button"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;