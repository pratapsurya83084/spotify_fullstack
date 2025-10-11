

import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify_Code = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const [isExpired, setIsExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const { otp_verify } = useContext(userContext);
   const navigate = useNavigate();
  // Initialize timer from localStorage
  useEffect(() => {
    const storedExpiry = localStorage.getItem("otp-expiry");

    if (storedExpiry) {
      const remaining = Math.floor((Number(storedExpiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
        setIsExpired(false);
      } else {
        setTimer(0);
      //  showResesndbtn_IN_CASE_true

        localStorage.setItem('resend',"true")
        setIsExpired(localStorage.getItem("resend"));
      }
    } else {
      // First visit: set expiry 60 seconds from now
      const expiryTime = Date.now() + 60 * 1000;
      localStorage.setItem("otp-expiry", expiryTime);
      setTimer(60);
      setIsExpired(false);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          setIsExpired(true);
          localStorage.removeItem("otp-expiry");
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) return alert("Please enter the verification code");

    setLoading(true);
    try {
      const response = await otp_verify(code);
      setLoading(false);

      if (response.success) {
        alert(response.message);
       navigate('/')
        localStorage.removeItem("otp-expiry"); // clear after success
     setIsExpired(localStorage.setItem("resend","false"))
       
      } else {
        alert(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/resend-code",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        const expiryTime = Date.now() + 60 * 1000;
        localStorage.setItem("otp-expiry", expiryTime);
        setTimer(60);
        setIsExpired(false);
      } else {
        alert(res.data.message || "Failed to resend code");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
          Verify Your Code
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your email. Code expires in{" "}
          <span className="font-medium text-indigo-600">{timer}s</span>.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="w-full text-center text-lg tracking-widest py-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
          />

          <button
            type="submit"
            disabled={isExpired || loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isExpired || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Verifying..." : isExpired ? "Code Expired" : "Verify Code"}
          </button>
        </form>

        {isExpired && (
          <button
            onClick={handleResend}
            className="mt-5 text-indigo-600 hover:underline font-medium"
          >
            Resend Code
          </button>

        )}
      </div>
    </div>
  );
};

export default Verify_Code;
