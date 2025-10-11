import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

export const userContext = createContext();

const baseUrl = "http://localhost:5000/api/v1/user";

const UserState = ({ children }) => {

const [User , setUser]  = useState();
const [IsAuth , setIsAuth]  = useState();
const [loading , setLoading]  = useState(true);



  //fetch User profile
  const fetchUser = async () => {
      setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/me`, { 
          headers: {
             "Content-Type": "application/json" 
            },
          withCredentials: true,
      });

      console.log("User retrieved:", res.data);

     setUser(res.data);
     setIsAuth(res.data);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
    }
  };


  // every render reload page
useEffect(()=>{
  fetchUser();
},[]);


const signup = async (userData) => {
  try {
    console.log("Sending signup data:", userData);

    const res = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    console.log("Signup success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    return error.response?.data;
  }
};


  //login
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(
        `${baseUrl}/login`,
        { email, password },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error while singning User :", error);
    }
  };


// after login sendded otp email verify
// take otp from user
const otp_verify = async (otp) =>{
try {
const res = await axios.post(`${baseUrl}/verify-code`,{verifyCode:otp},{
  headers:{
    'Content-type':'application/json',
  },
  withCredentials:true,
});
return res.data;

} catch (error) {
  console.log("error verifying otp :" , error.message);
}
} 



  return (
    <userContext.Provider
      value={{
        signup,
        loginUser,
        otp_verify,
        User,
        loading,
        IsAuth
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserState;
