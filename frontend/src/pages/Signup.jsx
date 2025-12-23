import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    category: "",
    state: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // TEMPORARY (for frontend demo)
    localStorage.setItem("user", JSON.stringify(formData));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white border rounded-md p-6 w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-6">Create Account</h1>

        <div className="space-y-4 text-sm">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
            required
          />

          <input
            name="branch"
            placeholder="Branch (eg. B.Tech IoT)"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <select
            name="category"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>

          <input
            name="state"
            placeholder="State"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          />

          <select
            name="gender"
            className="w-full border rounded px-3 py-2"
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
