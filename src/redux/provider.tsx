"use client" 

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { updateToken } from '@/api/authentication/loginApi';


export function ReduxProvider({ children }: { children: React.ReactNode }) {


        
  useEffect(() => {
    console.log("refresh token is working ::::::::::::::::::::::::")
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Current refersh token :::::::::>>", refreshToken)
    
    const refreshTokenInterval = setInterval(async () => {
      console.log("Refresh token process initiated");
      
      try {
        if (refreshToken){
          const newToken = await updateToken(refreshToken);
          console.log("New access token:", newToken.access);
          localStorage.setItem('accessToken', newToken.access);

        }
      } catch (error) {
        console.error("Error updating token:", error);

      }
    }, 30 * 60 *  1000); 

    return () => clearInterval(refreshTokenInterval);
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
