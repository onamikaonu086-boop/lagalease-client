// src/context/AuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // অ্যাপ রিলোড দিলে বা প্রথমবার ওপেন হলে ইউজার ও রোল চেক করার লজিক (মাইলস্টোন ৭ ও ৮)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            
            // ব্যাকএন্ড থেকে ইউজারের সঠিক রোল ভেরিফাই করা
            fetch(`http://localhost:5000/user/role/${parsedUser.email}`, {
                headers: { authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                setRole(data.role);
                setLoading(false);
            })
            .catch(() => {
                logout();
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    // লগইন সফল হলে স্টেট আপডেট করার ফাংশন
    const loginUser = async (email, token, userProfile) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userProfile));
        setUser(userProfile);
        
        const res = await fetch(`http://localhost:5000/user/role/${email}`);
        const data = await res.json();
        setRole(data.role);
    };

    // লগআউট ফাংশন
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, loginUser, logout, setUser, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);