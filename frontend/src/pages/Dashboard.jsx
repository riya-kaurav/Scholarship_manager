import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-2xl font-semibold mb-3">
          Find Scholarships That Match You
        </h1>

        <p className="text-gray-600 mb-6">
          Explore government and private scholarships based on eligibility,
          category, and state. Track your applications in one place.
        </p>

        <button
          onClick={() => navigate("/scholarships")}
          className="bg-black text-white px-6 py-2 text-sm"
        >
          Browse Scholarships
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
