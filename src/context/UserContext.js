import React from "react";
import { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(UserContext);
    const loginContext = (email, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        setUser((user) => ({
            email: email,
            auth: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };