'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            
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

    const createUser = async (name, email, password, photoURL) => {
        const res = await fetch('http://localhost:5000/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, image: photoURL })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        
        if (data.token) {
            loginUser(email, data.token, { name, email, image: photoURL });
        }
        return data;
    };

    const login = async (email, password) => {
        const res = await fetch('http://localhost:5000/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        
        if (data.token) {
            loginUser(email, data.token, data.user);
        }
        return data;
    };

    const loginUser = async (email, token, userProfile) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userProfile));
        setUser(userProfile);
        
        const res = await fetch(`http://localhost:5000/user/role/${email}`);
        const data = await res.json();
        setRole(data.role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, createUser, login, loginUser, logout, setUser, setRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);