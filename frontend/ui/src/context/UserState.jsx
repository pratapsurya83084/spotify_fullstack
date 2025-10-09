import React, {createContext } from 'react'
import axios from 'axios'

export const userContext = createContext();

 const baseUrl = "http://localhost:5000/api/v1/user";

const UserState = ({children}) => {


//fetch User
const fetchUser = async () => {
  try {
    const res = await axios.get(`${baseUrl}/me`, {
      withCredentials: true, // ✅ include cookies (JWT/session)
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("User retrieved:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
  }
};

fetchUser();








//login
    const loginUser = async (email , password) =>{
    try {
        
   const res = await axios.post(`${baseUrl}/login`,{email,password},{
    headers:{
        "Content-type":"application/json",
    },
    WithCredentials:true
   })
// console.log(res.data);
return res.data;
    } catch (error) {
        console.log("error while singning User :",error);
    }

    }

  return (
    <userContext.Provider value={{
    
        loginUser

    }}>
      {children}
    </userContext.Provider>
  )
}

export default UserState
