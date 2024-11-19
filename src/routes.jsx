import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import PageTitle from './components/PageTitle'
import SignUp from './pages/auth/SignUp'

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
        </Routes>
    )
}

export default AppRoutes