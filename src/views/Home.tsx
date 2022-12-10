import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);

  if (!auth.auth) {
    return <Navigate replace to="/" />;
  } else return <div>{auth.auth.toString()}</div>;
};

export default Home;
