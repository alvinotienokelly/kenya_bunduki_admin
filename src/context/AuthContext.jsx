import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Failed to decrypt data:', error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        const storedToken = Cookies.get('token');
        if (storedUser && storedToken) {
            const decryptedUser = decryptData(storedUser);
            const decryptedToken = decryptData(storedToken);
            if (decryptedUser && decryptedToken) {
                setUser(decryptedUser);
                setToken(decryptedToken);
            }
        }
    }, []);

    const login = (userData, token) => {
        const encryptedUser = encryptData(userData);
        const encryptedToken = encryptData(token);
        setUser(userData);
        setToken(token);
        Cookies.set('user', encryptedUser, { expires: 21, secure: true, sameSite: 'Strict' });
        Cookies.set('token', encryptedToken, { expires: 21, secure: true, sameSite: 'Strict' });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        Cookies.remove('user');
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};