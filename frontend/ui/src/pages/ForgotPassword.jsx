import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserState'
import { toast ,Toaster} from "react-hot-toast";
const ForgotPassword = () => {
const {SendResetPasswordLink} = useContext(userContext);


    const [loading,setLoading] = useState(false)
    const [email,setEmail] = useState("")
    const navigate = useNavigate();

const handelSubmit = async(e)=>{
    setLoading(true);
  e.preventDefault();
//   setEmail(...email);
  // Trim spaces
  const trimmedEmail = email.trim();
  //  validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if    empty
  if (!trimmedEmail) {
    toast.success("Please enter your email address!");
    return;
  }
  // Check    format
  if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address!");
    return;
  }

// console.log(trimmedEmail)

// here call password reset link send api
 const LinkIsSent =  await SendResetPasswordLink(trimmedEmail);
// console.log("link is sent ", LinkIsSent.success);
if (LinkIsSent.success) {
    toast.success(LinkIsSent.message);
}else{
    toast.error(LinkIsSent.message);
}
   setLoading(false);
}


  return (
   <div className="flex justify-center items-center min-h-screen  px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-800 border rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-500 mb-6">
          Enter your email address and we’ll send you a password reset link.
        </p>

        <form  onSubmit={handelSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>} */}

        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-white hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
