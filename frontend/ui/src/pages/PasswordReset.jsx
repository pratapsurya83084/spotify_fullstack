// import React, { useState } from "react";
// import { useContext } from "react";
// import { userContext } from "../context/UserState";
// import { useParams } from "react-router-dom";

// const PasswordReset = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const { PasswordReset } = useContext(userContext);
//   const [loading , setLoading] = useState(false);

//   const { user_id, token } = useParams();
//   // console.log(user_id, " " , token);
//   // take a userid and token from params for api call

//   const handleSubmit = async (e) => {
 
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     // Validation
//     if (!newPassword || !confirmPassword) {
//       setError("Please fill in both fields.");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters long.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       //call here api to reset the password
//       const result = await PasswordReset(
//         user_id,
//         token,
//         newPassword,
//         confirmPassword
//       );
//       console.log("password reset status is :", result.success);
//       // If valid
//       if (result.success) {
//         setSuccess("✅ Password reset successfully!");
//         setNewPassword("");
//         setConfirmPassword("");
//         setLoading(false)
//         Navigate("/login");
//       } else {
//         setSuccess(result.message);
//         setLoading(false)
//       }
//     } catch (error) {
//         setLoading(false)
//       setSuccess(error.message);
//       console.log("error while reseting password  :", error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
//           Reset Your Password
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label className="block text-gray-600 text-left mb-2">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               placeholder="Enter new password"
//               className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="mb-5">
//             <label className="block text-gray-600 text-left mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm new password"
//               className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
//           >
//          {loading? "Loading..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PasswordReset;





import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../context/UserState";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { PasswordReset } = useContext(userContext);
  const { user_id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await PasswordReset(user_id, token, newPassword, confirmPassword);

      if (result.success) {
        setSuccess("✅ Password reset successfully!");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login"); // redirect after success
        }, 1000);
      } else {
        setError(result.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      console.error("Error resetting password:", err);
    } finally {
      setLoading(false); // always stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-600 text-left mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 text-left mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
