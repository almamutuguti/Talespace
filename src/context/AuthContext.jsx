import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/Firebase';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);

        return () => unsubscribe();
    }, []);

    const login = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }

    const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext)
}

