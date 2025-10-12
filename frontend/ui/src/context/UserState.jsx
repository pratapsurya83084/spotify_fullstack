import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const userContext = createContext();

const baseUrl = "http://localhost:5000/api/v1/user";

const UserState = ({ children }) => {

const [User, setUser] = useState(false);
const [IsAuth, setIsAuth] = useState(false);
const [loading, setLoading] = useState(false);
const [UserotpIsVerify, setUserOtpisVerify] = useState(false);
const [UserIsLoggedIn, setUserIsLogged] = useState(false);
// console.log(User?.userProfile?.playList[0]) // first songid of my playLists
// Fetch user profile
const fetchUser = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${baseUrl}/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("User retrieved:", res.data);
if (res.data.success) {
  setUser(res.data || res.data.userProfile); // depends on your backend structure
  setIsAuth(true); //only true if request succeeded
    }
  } catch (error) {
    // console.error("Error fetching user:", error.response?.data || error.message);
    setIsAuth(false); 
    setUserOtpisVerify(error.response.data.OTPVerified);
    setUserIsLogged(error.response.data.IsLogged);
    // console.log("otp verified :",error.response.data.OTPVerified) // false
    // console.log("user is logged :",error.response.data.IsLogged) //true 

  } finally {
    setLoading(false);
  }
};

// Load user on mount
useEffect(() => {
  fetchUser();
}, []);


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

    // console.log("Signup success:", res.data);
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
// console.log(res.data.success)
if (res.data.success) {
  setIsAuth(true);
}
return res.data;

} catch (error) {
  console.log("error verifying otp :" , error.message);
}
}; 

//logout function
 const Logout = async()=>{

  try {

const res = await axios.delete("http://localhost:5000/api/v1/user/logout", {
  withCredentials: true,   
});

  if (res.data.success) {
      setUser(null);
      setIsAuth(false); 
    }
return res.data;

  } catch (error) {
    console.log("error while logout User :",error.message);
    return;
  }
};



// forgot password send link 
const SendResetPasswordLink = async (email) =>{
  try {
    const apiRes = await axios.post(`http://localhost:5000/api/v1/user/forgot-password`,{email},{
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
    });

    // console.log("password forgot link is send : ",apiRes);
    return apiRes.data;


  } catch (error) {
    console.log("error while sending the password reset link : ",error.message);
    return;
  }
}

// password reset api 
const PasswordReset = async(id,token, newPassword, conFirmPassword)=>{
  try {
    const apiRes = await axios.post(`${baseUrl}/reset-password/${id}/${token}`,{ newPassword, conFirmPassword},{
      headers:{
        'Content-Type':'application/json',
      },
      withCredentials:true,
    });
    return apiRes.data;
  } catch (error) {
    console.log("error while password reseting : ",error);
  }
}



//add to playList 
 const AddToPlayList = async (songId) => {
  try {
    const res = await axios.post(
      `${baseUrl}/song/${songId}`,
      {}, // no body needed
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
   // call 
    return res.data;
  } catch (error) {
    console.error("Error while adding/removing song to playlist:", error.message);
    return { success: false, message: error.message };
  }
};





  return (
    <userContext.Provider
      value={{
        signup,
        loginUser,
        UserotpIsVerify,
        UserIsLoggedIn,
        otp_verify,
        SendResetPasswordLink,
        PasswordReset,
        User,
        loading,
        setIsAuth,
        IsAuth,
        Logout,
        AddToPlayList
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserState;
