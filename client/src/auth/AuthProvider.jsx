import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const authServerUrl = process.env.REACT_APP_API_URL + "/auth/login/success";
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const getUser = () => {
      fetch(authServerUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          if (location.pathname !== "/login") {
            navigate("/");
          }
        })
        .then((resObject) => {
          setUser(resObject.user);
          navigate("/notes");
        })
        .catch((err) => {
          console.log(err);
          if (location.pathname !== "/login") {
            navigate("/");
          }
        });
    };
    getUser();
    
  }, [authServerUrl, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
