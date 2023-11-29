
'use client';

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {

      setUser(() => (JSON.parse(window.localStorage.getItem("user"))));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);