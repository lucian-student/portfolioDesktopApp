import React, { createContext, useState, useRef, useEffect } from 'react';
import logoutFunction from '../queries/admin/logout';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const source = useRef(axios.CancelToken.source());
    const [admin, setAdmin] = useState(null);
    useEffect(() => {
        const cancelToken = source.current;
        return () => {
            cancelToken.cancel('canceled auth context');
        }
    }, []);
    async function logout() {
        await logoutFunction(setAdmin, source.current);
    }

    return (
        <AuthContext.Provider value={{
            admin, setAdmin, logout, source: source.current
        }}>
            {children}
        </AuthContext.Provider>
    )
}
