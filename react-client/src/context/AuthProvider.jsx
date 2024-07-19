import { useState } from 'react';
import { authContext } from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(window.localStorage.getItem("username"));
  
  const saveUserSession = (newValue) => {
    if (!newValue) {
      window.localStorage.clear();
      setUser(null);
    } else {
      window.localStorage.setItem('username', newValue);
      setUser(newValue);
    }
  };

  return <authContext.Provider value={{user, saveUserSession}}>{children}</authContext.Provider>
}
