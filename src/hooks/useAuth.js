import React, { useState, useEffect } from "react";
import JwtDecode from "jwt-decode";

export default function () {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setisLoggedIn(false);
      setIsLoading(false)
      return;
    }
    const payload = JwtDecode(token);
    console.log(payload, Date.now(), payload.exp * 1000 > Date.now())
    
    setisLoggedIn(payload.exp * 1000 > Date.now());
    setIsLoading(false)
  }, []);

  return { isLoggedIn, isLoading };
}
