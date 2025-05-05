// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setLocalUser] = useState(null);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
      console.log("User found in localStorage:", JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setLocalUser, userType ,setUserType }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
