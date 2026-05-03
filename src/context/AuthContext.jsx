import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
export const authContext = createContext();

export default function AuthContextProvider({ children }) {

    const [userToken, setUserToken] = useState(function () {

        return localStorage.getItem('token');
    });

    const [userId, setUserId] = useState(null)

    function handleAuthSuccess(token) {

        setUserToken(token);
        localStorage.setItem("token", token);

    }

    function clearUserToken() {

        setUserToken(null);
        localStorage.removeItem("token");

    }

    function decodeUserToken() {

        const decodeUserTokenValue = jwtDecode(userToken);
        setUserId(decodeUserTokenValue.user);
        console.log(decodeUserTokenValue.user)
    }

    useEffect(() => {

        if (userToken) {

            decodeUserToken();

        }
    }, [userToken])

    return (

        <authContext.Provider value={{ userToken, handleAuthSuccess, clearUserToken, userId }}>

            {children}

        </authContext.Provider>

    )
}
