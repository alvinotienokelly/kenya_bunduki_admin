import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PageTitle from './components/PageTitle'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import OtpVerification from './pages/auth/OtpVerification'
import Layout from './elements/Layout'
import PageNotFound from './pages/PageNotFound'
import Deals from './pages/deals/Deals'
import MyDeals from './pages/deals/MyDeals'
import TargetCompanies from './pages/TargetCompanies'
import Settings from './pages/settings/Settings'

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
    )
}

export default AppRoutes