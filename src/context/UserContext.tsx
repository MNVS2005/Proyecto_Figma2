import { createContext, useContext, useState } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  login: () => void;
  register: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const register = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
};
