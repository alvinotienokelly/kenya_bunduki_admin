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

export const getUsersByType = async (userType) => {
  try {
    const response = await api.get(`/users/users-by-type/${userType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

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

export const getDealsByUserPreference = async () => {
  try {
    const response = await api.get('/deals/user/preferences');
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

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export const getDealMilestones = async (id) => {
  try {
    const response = await api.get(`/milestones/deal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deal tasks:", error);
    throw error;
  }
}

export const getMilestones = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/milestones/filter/milestones?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching milestones:", error);
    throw error;
  }
};

export const addDealMilestone = async (milestoneData) => {
  try {
    const response = await api.post("/milestones", milestoneData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteDealMilestone = async (id) => {
  try {
    const response = await api.delete(`/milestones/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateDealMilestone = async (id, data) => {
  try {
    const response = await api.put(`/milestones/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}