import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import PageTitle from "./components/PageTitle";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OtpVerification from "./pages/auth/OtpVerification";
import Layout from "./elements/Layout";
import PageNotFound from "./pages/PageNotFound";
import Deals from "./pages/deals/Deals";
import MyDeals from "./pages/deals/MyDeals";
import TargetCompanies from "./pages/TargetCompanies";
import Settings from "./pages/settings/Settings";
import TaskList from "./pages/tasks/TaskList";
import Milestones from "./pages/milestones/Milestones";
import ViewDeal from "./pages/deals/ViewDeal";
import AdminDashboard from "./pages/dashboard/Dashboard";
import BookingsManagement from "./pages/bookings/BookingsManagement";
import UsersManagement from "./pages/users/UsersManagement";
import TimeSlotsManagement from "./pages/timeSlots/TimeSlotsManagement";
import GunTypesManagement from "./pages/gunTypes/GunTypesManagement";
import PaymentsTransactions from "./pages/payments/PaymentsTransactions";
import ShootingLineManagement from "./pages/shootingLines/ShootingLineManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/accounts/login" replace />} />

      {/* Authentication routes */}
      <Route
        path="/accounts/login"
        element={
          <>
            <PageTitle title="Sign In" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/dashboard/payments-transactions"
        element={
          <>
            <PageTitle title="Payments & Transactions" />
            <PaymentsTransactions />
          </>
        }
      />
      <Route
        path="/dashboard/bookings-management"
        element={
          <>
            <PageTitle title="Bookings Management" />
            <BookingsManagement />
          </>
        }
      />

      <Route
        path="/dashboard/shooting-line-management"
        element={
          <>
            <PageTitle title="Shooting Lane Management" />
            <ShootingLineManagement />
          </>
        }
      />
      <Route
        path="/dashboard/gun-types-management"
        element={
          <>
            <PageTitle title="Gun Types Management" />
            <GunTypesManagement />
          </>
        }
      />
      <Route
        path="/dashboard/time-slots-management"
        element={
          <>
            <PageTitle title="Time Slots Management" />
            <TimeSlotsManagement />
          </>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <>
            <PageTitle title="Admin Dashboard" />
            <AdminDashboard />
          </>
        }
      />
      <Route
        path="/dashboard/users-management"
        element={
          <>
            <PageTitle title="Users Management" />
            <UsersManagement />
          </>
        }
      />
      <Route
        path="/accounts/register"
        element={
          <>
            <PageTitle title="Sign Up" />
            <SignUp />
          </>
        }
      />
      <Route
        path="/accounts/otp-verification"
        element={
          <>
            <PageTitle title="Verify OTP" />
            <OtpVerification />
          </>
        }
      />
      <Route
        path="/accounts/forgot-password"
        element={
          <>
            <PageTitle title="Forgot password" />
            <ForgotPassword />
          </>
        }
      />

      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <>
            <PageTitle title="Dashboard" />
            <Layout />
          </>
        }
      />

      {/* Page not found */}
      <Route
        path="*"
        element={
          <>
            <PageTitle title="Page Not Found" />
            <PageNotFound />
          </>
        }
      />

      {/* Deals routes */}
      <Route
        path="/dashboard/deals"
        element={
          <>
            <PageTitle title="All deals" />
            <Deals />
          </>
        }
      />

      <Route
        path="/dashboard/deals/:id"
        element={
          <>
            <PageTitle title="View deal" />
            <ViewDeal />
          </>
        }
      />

      <Route
        path="/dashboard/my-deals"
        element={
          <>
            <PageTitle title="My deals" />
            <MyDeals />
          </>
        }
      />

      {/* target companies routes */}
      <Route
        path="/dashboard/target-companies"
        element={
          <>
            <PageTitle title="Target Companies" />
            <TargetCompanies />
          </>
        }
      />

      <Route
        path="/dashboard/tasks"
        element={
          <>
            <PageTitle title="Tasks" />
            <TaskList />
          </>
        }
      />

      <Route
        path="/dashboard/milestones"
        element={
          <>
            <PageTitle title="Milestones" />
            <Milestones />
          </>
        }
      />

      {/* settings routes */}
      <Route
        path="/dashboard/settings"
        element={
          <>
            <PageTitle title="Settings" />
            <Settings />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
