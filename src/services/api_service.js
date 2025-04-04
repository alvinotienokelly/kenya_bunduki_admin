import api from "../services/AxiosInsance.js";

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
};

// notifications services
export const fetchNotifications = async () => {
  try {
    const response = await api.get("/notifications");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// deals services
export const fetchDeals = async () => {
  try {
    const response = await api.get("/deals");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMyDeals = async () => {
  try {
    const response = await api.get("/deals/my-deals");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealsByUserPreference = async () => {
  try {
    const response = await api.get("/deals/user/preferences");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAcceptedDealsForInvestor = async () => {
  try {
    const response = await api.get("/deals/accepted-deals");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const expressInterest = async (dealId) => {
  try {
    const response = await api.post(`/deal-access-invites/interest`, {
      deal_id: dealId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDealDetails = async (dealId) => {
  try {
    const response = await api.get(`/deals/${dealId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const withdrawInterest = async (dealId) => {
  try {
    const response = await api.post(`/deals/${dealId}/withdraw-interest`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// transaction services
export const fetchTransactions = async () => {
  try {
    const response = await api.get("/transactions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getDealMilestones = async (id) => {
  try {
    const response = await api.get(`/milestones/deal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deal tasks:", error);
    throw error;
  }
};

export const getMilestones = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(
      `/milestones/filter/milestones?${queryString}`
    );
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
};

export const deleteDealMilestone = async (id) => {
  try {
    const response = await api.delete(`/milestones/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/milestones/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDealMilestone = async (id, data) => {
  try {
    const response = await api.put(`/milestones/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/milestones/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getmeetingByDealId = async (id) => {
  try {
    const response = await api.get(`/noble-teams/deal/${id}/meetings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealTasks = async (id) => {
  try {
    const response = await api.get(`/tasks/deal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deal tasks:", error);
    throw error;
  }
};

export const fetchDeal = async (id) => {
  try {
    const response = await api.get(`/deals/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSectors = async () => {
  try {
    const response = await api.get("/sectors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubsectors = async () => {
  try {
    const response = await api.get("/subsectors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCountries = async () => {
  try {
    const response = await api.get("/countries");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchRegions = async () => {
  try {
    const response = await api.get("/regions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchContinents = async () => {
  try {
    const response = await api.get("/continents");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchContactPerson = async (id) => {
  try {
    const response = await api.get(`contact-persons/user/contacts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addContactperson = async (contactData) => {
  try {
    const response = await api.post("/contact-persons", contactData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateContactPerson = async (id, data) => {
  try {
    const response = await api.put(`/contact-persons/${id}`, data);
    JSON.stringify(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactPerson = async (id) => {
  try {
    const response = await api.delete(`/contact-persons/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserTicketPreference = async (preferenceData) => {
  try {
    const response = await api.post("/user-ticket-preferences", preferenceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTicketPreferences = async () => {
  try {
    const response = await api.get(`/user-ticket-preferences`);
    console.log("The user preferences are", JSON.stringify(response));
    console.log(JSON.stringify(response));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTicketPreference = async (id, data) => {
  try {
    const response = await api.put(`/user-ticket-preferences/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// transaction services
export const getAllInvestorMilestoneStatusesByUser = async () => {
  try {
    const response = await api.get("/investor-milestone-statuses/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// tasks services
export const getUsertasks = async () => {
  try {
    const response = await api.get("/tasks/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMultipleDealTypePreferences = async (data) => {
  try {
    const response = await api.post("/deal-type-preferences/multiple", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserMultipleDealTypePreferences = async () => {
  try {
    const response = await api.get("/deal-type-preferences/unique");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getUserContinentPreferences = async () => {
  try {
    const response = await api.get("/continent-preferences/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRegionPreferences = async () => {
  try {
    const response = await api.get("/region-preferences");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCountryPreferences = async () => {
  try {
    const response = await api.get("/country-preferences");
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Bookings services
export const fetchBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveBooking = async (bookingId) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/confirm`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectBooking = async (bookingId) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const modifyBooking = async (bookingId, newDetails) => {
  try {
    const response = await api.put(`/bookings/${bookingId}`, newDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const response = await api.put(`/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deactivateUser = async (userId) => {
  try {
    const response = await api.put(`/users/${userId}/deactivate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const banUser = async (userId) => {
  try {
    const response = await api.put(`/users/${userId}/ban`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchTimeSlots = async () => {
  try {
    const response = await api.get("/time-slots");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTimeSlot = async (data) => {
  try {
    const response = await api.post("/time-slots", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTimeSlot = async (id, data) => {
  try {
    const response = await api.put(`/time-slots/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTimeSlot = async (id) => {
  try {
    const response = await api.delete(`/time-slots/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGunTypes = async () => {
  try {
    const response = await api.get("/guntypes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGunType = async (data) => {
  try {
    const response = await api.post("/guntypes", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGunType = async (id, data) => {
  try {
    const response = await api.put(`/guntypes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGunType = async (id) => {
  try {
    const response = await api.delete(`/guntypes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const processRefund = async (paymentId) => {
  try {
    const response = await api.post(`/payments/${paymentId}/refund`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBookingPrice = async (bookingId, newPrice) => {
  try {
    const response = await api.put(`/bookings/${bookingId}/price`, {
      price: newPrice,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (bookingdata) => {
  try {
    console.log("The response is", JSON.stringify(bookingdata));

    const response = await api.post(`/bookings`, bookingdata);
    console.log("The response is", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log("The response is", JSON.stringify(error));

    throw error;
  }
};

export const createUser = async (paymentId) => {
  try {
    const response = await api.post(`/payments/${paymentId}/refund`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchShootingLines = async () => {
  try {
    const response = await api.get("/shootinglines");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createShootingLine = async (data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const response = await api.post("/shootinglines", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateShootingLine = async (id, data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const response = await api.put(`/shootinglines/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteShootingLine = async (id) => {
  try {
    const response = await api.delete(`/shootinglines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
