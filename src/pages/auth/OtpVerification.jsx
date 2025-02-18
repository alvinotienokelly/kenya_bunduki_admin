import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { sendOtp, verifyOtp } from '../../services/api_service';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import { useAuth } from '../../context/AuthContext';

const OtpVerification = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const inputRefs = useRef([]);

  const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || '';

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  useEffect(() => {
    const { otp } = location.state || {};
    if (otp) {
      setCode(otp.split(''));
      inputRefs.current[otp.length - 1]?.focus();
    }
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [location.state]);

  const { email, type } = location.state;

  const hashedEmail = email.replace(/^(.)(.*)(.@.*)$/, (_, first, hidden, domain) =>
    `${first}${'*'.repeat(hidden.length)}${domain}`
  );

  useEffect(() => {
    toast.success('OTP sent to your email and phone');
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.join('').length === 6 && !newCode.includes('')) {
      handleSubmit(newCode.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (otpCode) => {
    setLoading(true);

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtp({ email, code: otpCode || code.join(''), type });
      setLoading(false);

      if (response.status) {
        toast.success(response.message);

        if (type === 'login') {
          if (response.token) {
            const encryptedUser = encryptData(response.user);
            const encryptedToken = encryptData(response.token);

            Cookies.set('user', encryptedUser, { expires: 2, secure: true, sameSite: 'Strict' });
            Cookies.set('token', encryptedToken, { expires: 2, secure: true, sameSite: 'Strict' });
            login(response.user, response.token);
          } else {
            toast.error('Token is missing');
          }
          navigate('/dashboard/admin');
        } else if (type === 'forgot-password') {
          navigate('/accounts/reset-password', { state: { email, token: otpCode || code.join('') } });
        }
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to verify OTP');
      console.error('OTP verification error:', err);
    }
  };

  const handleResendOtp = async () => {
    try {
      await sendOtp({ email });
      toast.success('OTP resent successfully');
      setTimer(90);
    } catch {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 signin-background dark:bg-gray-900 dark:text-white">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md dark:bg-gray-800">
        <h2 className="text-[18px] text-primary font-semibold text-center mb-4 dark:text-gray-100">
          OTP Verification
        </h2>
        <p className="text-center my-4 text-[14px] text-black dark:text-gray-300">
          We've sent you an SMS and email with a verification code (OTP) on:
        </p>
        <p className="text-gray-700 text-center mb-3 dark:text-gray-300">
          OTP sent to <strong className="dark:text-gray-100">{hashedEmail}</strong>
        </p>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[idx] = el)}
                value={digit}
                className="w-10 h-10 border text-center rounded-md focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onChange={(e) => handleOtpChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
            ))}
          </div>

          {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            className={`w-full bg-primary text-white py-2 rounded-md transition ${loading ? 'bg-opacity-50 cursor-not-allowed' : ''} dark:bg-primary-dark`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4">
          <button onClick={() => navigate(-1)} className="text-primary underline dark:text-gray-100">
            Go Back
          </button>
          {timer > 0 ? (
            <span className="text-gray-500 dark:text-gray-400">Resend OTP in {timer}s</span>
          ) : (
            <button onClick={handleResendOtp} className="text-primary underline dark:text-gray-100">
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
