import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  user: {},
  setUser: ({}) => {}
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
