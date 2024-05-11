import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const token = (verificationToken) =>{
        return localStorage.setItem("authToken", verificationToken)
    };

    return(
        <AuthContext.Provider value = {{token}}>
            {children}
        </AuthContext.Provider>
    )
};