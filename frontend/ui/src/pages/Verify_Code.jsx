
import { toast ,Toaster} from "react-hot-toast";
import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../context/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify_Code = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(59);
  const [isExpired, setIsExpired] = useState(false); // false = OTP active
  const [loading, setLoading] = useState(false);
  const [IsAuth ,setIsAuth]= useState();
  const { otp_verify } = useContext(userContext);
  const navigate = useNavigate();

  
  //
  useEffect(() => {
    const storedExpiry = localStorage.getItem("otp-expiry");

    if (storedExpiry) {
      const remaining = Math.floor((Number(storedExpiry) - Date.now()) / 1000);
      if (remaining > 0) {
        setTimer(remaining);
        setIsExpired(false);
      } else {
        localStorage.removeItem("otp-expiry");
        setTimer(0);
        setIsExpired(true);
      }
    } else {
      // Fresh start
      const expiryTime = Date.now() + 60 * 1000;
      localStorage.setItem("otp-expiry", expiryTime);
      setTimer(59);
      setIsExpired(false);
    }
  }, []);

  // 
    useEffect(() => {
    if (isExpired || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          localStorage.removeItem("otp-expiry");
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExpired, timer]);

  //  Verify OTP
const handleVerify = async (e) => {
  e.preventDefault();
  if (!code) return alert("Please enter the verification code");

  setLoading(true);
  try {
    const response = await otp_verify(code);

    if (response.success) {
      setLoading(false);
      localStorage.removeItem("otp-expiry");
    setIsAuth(true)
      // Use setTimeout to ensure navigation happens after alert
      toast.success(response.message);
      setTimeout(() => {
        navigate("/"); // now navigation works reliably
      }, 1500);
    } else {
      setLoading(false);
      toast.error(response.message);
    }
  } catch (error) {
    setLoading(false);
    console.error("Error verifying OTP:", error);
    toast.error("Something went wrong. Please try again.");
  }
};


  //  Resend OTP
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
          toast.success(res.data.message);

        // Restart timer
        const expiryTime = Date.now() + 60 * 1000;
        localStorage.setItem("otp-expiry", expiryTime);
        setTimer(59);
        setIsExpired(false);
      } else {
          toast.error(res.data.message || "Failed to resend code");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
        <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-800 border shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Verify Your Code
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your email. Code expires in{" "}
          <span
            className={`font-medium ${
              timer <= 10 ? "text-red-500" : "text-green-600"
            }`}
          >
            {timer}s
          </span>
          .
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
            {loading
              ? "Verifying..."
              : isExpired
              ? "Code Expired"
              : "Verify Code"}
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
