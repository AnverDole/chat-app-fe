'use client';

import User from 'interfaces/user';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            try{
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }catch(err: any){
                setUser(null);
                setToken(null);
            }
        }
    }, []);

    const login = (user: User, token: string) => {
        console.log(user, token)
        if (!user || !token)
            return;

        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };


    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access auth
export const useAuth = () => useContext(AuthContext);
