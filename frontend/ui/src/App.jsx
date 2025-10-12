import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { userContext } from "./context/UserState";
import Loading from "./components/Loading";
import Verify_Code from "./pages/Verify_Code";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  const { IsAuth, loading } = useContext(userContext);

  console.log("is auth : " ,IsAuth); // false false

  return (
    <BrowserRouter>
      {!loading ? (
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/login" element={IsAuth ? <Home /> : <Login />} />

          //sent link on email
          <Route path="/forgot-password" element={<ForgotPassword />} />
          //reset password page route
          <Route path="/user/reset-password/:user_id/:token" element={<PasswordReset/>} />

          <Route path="/sign-up" element={<Signup />} />
          <Route
            path="/verify-code"
            element={IsAuth ? <Home /> : <Verify_Code />}
          />
        </Routes>
      ) : (
        <Loading />
      )}
    </BrowserRouter>
  );
};

export default App;
