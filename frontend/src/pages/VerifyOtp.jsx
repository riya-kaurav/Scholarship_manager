import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const verifyOtp = async () => {
    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  if (!email) {
    return <p className="p-6">Invalid access</p>;
  }

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-semibold">Verify OTP</h2>

      <input
        className="border w-full p-2"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={verifyOtp}
        className="w-full bg-black text-white py-2"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyOtp;


