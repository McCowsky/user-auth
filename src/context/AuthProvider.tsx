import React, { useState, createContext, ReactNode, Context } from "react";

export interface IUser {
  auth: {};
  setAuth: () => {};
}

const initialState = {
  auth: { auth: false, name: "", password: "", accessToken: "" },
  setAuth: (auth: {
    auth: boolean;
    name: string;
    password: string;
    accessToken: string;
  }) => {},
};

export interface AuthProviderProps {
  children?: ReactNode;
}

const AuthContext = createContext(initialState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState(initialState.auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
