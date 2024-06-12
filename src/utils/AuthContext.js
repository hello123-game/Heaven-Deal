import { createContext,useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [profileData, setProfileData] = useState("");

    const token = (verificationToken) =>{
        return localStorage.setItem("authToken", verificationToken)
    };

    return(
        <AuthContext.Provider value = {{token, profileData, setProfileData}}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };