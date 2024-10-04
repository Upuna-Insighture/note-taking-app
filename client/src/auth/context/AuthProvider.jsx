import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

  const authServerUrl = process.env.REACT_APP_AUTH_SERVER_URL + "/auth/login/success";
  const loginRoute = process.env.REACT_APP_AUTH_LOGIN_ROUTE;
  const navigateSuccess = process.env.REACT_APP_AUTH_NVIGATE_SUCCESS; 
  const navigateError = process.env.REACT_APP_AUTH_NVIGATE_ERROR; 

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
          if (location.pathname !== loginRoute) {
            navigate(navigateError);
          }
        })
        .then((resObject) => {
          setUser(resObject.user);
          navigate(navigateSuccess);
        })
        .catch((err) => {
          console.log(err);
          if (location.pathname !== loginRoute) {
            navigate(navigateError);
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
