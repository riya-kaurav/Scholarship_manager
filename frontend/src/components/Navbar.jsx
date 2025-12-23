import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="border-b px-6 py-3 flex justify-between">
      <h1 className="font-semibold">Scholarship Manager</h1>

      {token && (
        <div className="space-x-4 text-sm">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/scholarships">Scholarships</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
