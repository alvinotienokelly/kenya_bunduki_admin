import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PageTitle from './components/PageTitle'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'

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
                path="/accounts/forgot-password"
                element={
                    <>
                        <PageTitle title="Forgot password" />
                        <ForgotPassword />
                    </>
                }
            />
        </Routes>
    )
}

export default AppRoutes