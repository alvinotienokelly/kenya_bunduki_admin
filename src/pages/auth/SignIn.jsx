import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser } from '../../services/api_service';
import img from '../../assets/img.png'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      if (response.status) {
        const otp = response.message.match(/\d{6}/)?.[0];
        navigate('/accounts/otp-verification', {
          state: { email: email, type: 'login', otp },
        });
        toast.success("OTP sent to your email");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      setError('Request failed. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 flex-col-reverse md:flex-row items-center bg-white justify-center h-screen bg-cover bg-center signin-background dark:bg-gray-900 p-8 dark:text-white">
      <img src={img} alt="" />
      <div className="w-[90%] dark:border border-gray-600 rounded-md dark:p-4">
        <p className="my-4 font-semibold text-[18px] text-black text-center dark:text-gray-300">
          Login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="relative group w-full">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 text-white bg-primary rounded-md focus:outline-none transition ${loading && 'bg-opacity-50 cursor-not-allowed'
                }`}
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
            {loading && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Please wait...
              </div>
            )}
          </div>
        </form>
        {error && <p className="text-red-500 text-start mt-0.5">{error}</p>}
        <div className="flex items-center w-full justify-between">
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-100">
            <Link to="/accounts/forgot-password" className="text-primary dark:text-gray-100 hover:underline font-medium">
              Forgot Password
            </Link>
          </p>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-100">
            Don't have an account?{' '}
            <Link to="/accounts/register" className="ml-2 underline text-primary dark:text-gray-100 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
