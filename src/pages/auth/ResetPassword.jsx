import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../../services/api_service';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, token } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword({ email, token, password });
      setLoading(false);
      if (response.status) {
        toast.success(response.message);
        navigate('/accounts/login');
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to reset password');
      console.error('Reset password error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center signin-background dark:bg-gray-900 dark:text-white">
      <div className="w-[90%] max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-[18px] font-semibold text-center text-primary dark:text-gray-100">
          Reset your password
        </h2>
        <p className="text-center py-2 text-[14px] text-black dark:text-gray-300">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your new password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Re-enter your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {error && <p className="text-red-500 text-start mt-0.5 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white bg-primary rounded-md focus:outline-none transition ${loading ? 'bg-opacity-50 cursor-not-allowed' : ''} dark:bg-primary-dark`}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
