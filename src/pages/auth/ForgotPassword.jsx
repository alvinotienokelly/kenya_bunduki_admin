import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../services/api_service';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sendOtp({ email });
      if (response.status) {
        toast.success("Otp code sent");
        navigate('/accounts/otp-verification', {
          state: { email: email, type: 'forgot-password' },
        });
      } else {
        toast.error(response.message || "Request failed");
      }
    } catch (err) {
      setError('Failed to send reset password email');
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 dark:text-white text-black">
      <div className="w-[90%] max-w-md bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-[18px] font-semibold text-center text-primary dark:text-white">
          Forgot your password?
        </h2>
        <p className="text-center py-2 text-[14px]">
          We will send you an OTP to reset your password
        </p>

        {error && <p className="text-red-500 text-start mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="johndoe@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white bg-primary rounded-md focus:outline-none ${loading ? 'bg-opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Processing...' : 'Send OTP'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          <span>Remembered your password? </span>
          <a href="/accounts/login" className="text-primary dark:text-gray-100 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
