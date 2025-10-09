import React, { useContext, useState } from "react";
import { userContext } from "./UserState";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(userContext);
  // console.log(user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    // else if (password.length < 6) e.password = "Password must be at least 6 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);

    // Simulate login (replace with real API call)
    const res = await loginUser(email, password);
    console.log("login : ", res);
    if (res.success) {
      alert(res.message + " on email ");
      navigate("/verify-code");
    } else {
      alert(res.message);
    }

    setTimeout(() => {
      setLoading(false);
      // Here you would normally handle token / redirect
    //   alert(`Logged in as ${email} ${remember ? "(remembered)" : ""}`);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121212] via-[#1b1b1b] to-[#111827] px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl p-8 shadow-2xl">
        <header className="text-center mb-6">
          <div className="text-3xl font-extrabold text-white tracking-tight">
            Spotify{" "}
          </div>
          <p className="text-sm text-gray-300 mt-2">
            Sign in to continue to Spotify
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <label className="block">
            <span className="text-xs text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`mt-1 w-full rounded-md px-3 py-2 bg-white/6 placeholder-gray-400 text- focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${
                errors.email ? "ring-1 ring-red-400" : ""
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          </label>
          {errors.email && (
            <p id="email-error" className="text-xs text-red-400">
              {errors.email}
            </p>
          )}

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-300">Password</span>
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="text-xs text-gray-400 hover:text- transition-colors"
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`mt-1 w-full rounded-md px-3 py-2 bg-white/6 placeholder-gray-400 text- focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow ${
                errors.password ? "ring-1 ring-red-400" : ""
              }`}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
          </label>
          {errors.password && (
            <p id="password-error" className="text-xs text-red-400">
              {errors.password}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded bg-white/6 checked:bg-green-500 checked:ring-0"
              />
              Remember me
            </label>

            <a href="#" className="text-green-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black shadow hover:brightness-95 disabled:opacity-60"
          >
            {loading ? (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="4"
                  strokeOpacity="0.15"
                />
                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            ) : null}
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <span>Don’t have an account? </span>
          <a href="#" className="text-white hover:underline">
            Sign up for Spotify
          </a>
        </div>

        <div className="mt-6">
          <div className="relative my-4 flex items-center">
            <span className="flex-grow h-px bg-white/6" />
            <span className="px-3 text-xs text-gray-400">Or continue with</span>
            <span className="flex-grow h-px bg-white/6" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              className="flex items-center justify-center gap-2 rounded-md border border-white/6 px-3 py-2 text-sm text-white/90 hover:bg-white/3"
              aria-label="Continue with Apple"
            >
              Apple
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-md border border-white/6 px-3 py-2 text-sm text-white/90 hover:bg-white/3"
              aria-label="Continue with Google"
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
