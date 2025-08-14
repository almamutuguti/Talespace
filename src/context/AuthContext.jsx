import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/Firebase';


const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false)
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        setError(null)
        const provider = new GoogleAuthProvider();
        // return signInWithPopup(auth, provider)
        try {
            await signInWithPopup(auth, provider)
        } catch (err) {
            setError(err.message)
        }
    }

    const logout = () => signOut(auth);

    const signUp = async(email, password) => {
        setError(null)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            setError(err.message)
        }
        
    }

    const emailLogin = async (email, password) => {
        setError(null)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            setError(err.message)
        }
       
    }

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp, emailLogin, loading, error }}>
        {children}
    </AuthContext.Provider>
  );
}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}

