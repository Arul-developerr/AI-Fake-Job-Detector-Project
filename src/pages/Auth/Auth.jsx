import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth action
    console.log(isLogin ? "Logging in..." : "Signing up...");
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="auth-subtitle">
              {isLogin ? "Sign in to access your dashboard" : "Join FakeGuard AI to protect yourself"}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <HiOutlineUser className="input-icon" />
                  <input type="text" className="form-input" placeholder="John Doe" required />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <HiOutlineMail className="input-icon" />
                <input type="email" className="form-input" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <HiOutlineLockClosed className="input-icon" />
                <input type="password" className="form-input" placeholder="••••••••" required />
              </div>
            </div>

            {isLogin && (
              <div className="form-options">
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn-primary auth-submit">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button className="auth-toggle-btn" onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
