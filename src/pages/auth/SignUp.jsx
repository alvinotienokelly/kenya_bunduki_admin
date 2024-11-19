import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { registerUser } from '../../services/api_service';
import img from '../../assets/img.png';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, phone };
    
    setLoading(true);
    try {
      const response = await registerUser(userData);
      if (response.status) {
        toast.success("Registration successful!");
        navigate('/accounts/login');
      } else {
        toast.error(response.message || "Registration failed. Please try again.");
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      toast.error("An error occurred during registration. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-6 flex-col-reverse md:flex-row items-center bg-white justify-center h-screen bg-cover bg-center signin-background dark:bg-gray-900 p-8 dark:text-white">
      <div className="w-[90%] dark:border border-gray-700 dark:p-4 rounded-lg">
        <p className="my-4 font-semibold text-[18px] text-black text-center dark:text-gray-300">
          Login to your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-transparent dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="johndoe@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-transparent dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-transparent dark:border-gray-600 dark:text-white"
            />
            <div
              className="absolute top-[58%] right-3 flex items-center cursor-pointer text-gray-600 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              placeholder="123-456-7890"
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary dark:bg-transparent dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 text-white bg-primary rounded-md focus:outline-none dark:bg-primary-dark"
          >
           {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="text-red-500 text-start mt-0.5">{error}</p>}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-100">
          <p>Already have an account?{' '}</p>
          <Link to="/accounts/login" className="underline ml-2 text-primary dark:text-gray-100 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
      <img src={img} alt="" />
    </div>
  )
}

export default SignUp