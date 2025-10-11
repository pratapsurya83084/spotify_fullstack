import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { userContext } from "./context/UserState";
import Loading from "./components/Loading";
import Verify_Code from "./pages/Verify_Code";
import Signup from "./pages/Signup";



const App = () => {

const {IsAuth , loading } = useContext(userContext);

console.log("is auth : " , IsAuth);

  return (
    <BrowserRouter>
    {/* { */}
      // loading? (
          <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={IsAuth?<Home/>  :<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify-code" element={IsAuth?<Home/>:<Verify_Code />} />
      </Routes>
      
    // ):

    // (
{/* <Loading/> */}
    // )

    // 
    </BrowserRouter>
  );
};

export default App;
