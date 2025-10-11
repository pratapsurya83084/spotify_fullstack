import React, { useContext, useState } from "react";
import { userContext } from "../context/UserState";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const {Signup} = useContext(userContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
     console.log("Signup Data:", formData);

     const signupUser = await Signup(formData);
     console.log("register user success : ", signupUser);
     // console.log(signupUser.success);
    
     // Example: send to backend
      // const res = await axios.post(`${baseUrl}/signup`, formData);
      // setMessage(res.data.message);

      setTimeout(() => {
        setLoading(false);
        if (signupUser.success) {
            setMessage("Signup successful! 🎉");
            navigate('/login');
        }else{
            setMessage("Something went wrong ❌");
        }
      }, 1500);
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong ❌");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className=" bg-white/5 shadow-2xl border rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to get started 
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-2 border-indigo-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="user">User</option>
              {/* <option value="admin">Admin</option> */}
            </select>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
