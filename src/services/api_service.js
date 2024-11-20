import api from '../services/AxiosInsance.js';

// User services
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post("/users/verify-code", otpData);
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const sendOtp = async (emailData) => {
  try {
    const response = await api.post("/users/forgot-password", emailData);
    return response.data;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw error;
  }
};

export const resetPassword = async (passwordData) => {
  try {
    const response = await api.post("/users/reset-password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// notifications services
export const fetchNotifications = async () => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// deals services
export const fetchDeals = async () => {
  try {
    const response = await api.get('/deals');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchMyDeals = async () => {
  try {
    const response = await api.get('/deals/my-deals');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const expressInterest = async (dealId) => {
  try {
    const response = await api.post(`/deals/${dealId}/express-interest`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchDealDetails = async (dealId) => {
  try {
    const response = await api.get(`/deals/${dealId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const withdrawInterest = async (dealId) => {
  try {
    const response = await api.post(`/deals/${dealId}/withdraw-interest`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


// transaction services
export const fetchTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response.data;
  } catch (error) {
    throw error;
  }
}