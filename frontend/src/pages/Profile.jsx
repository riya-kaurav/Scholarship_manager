const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No user data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="bg-white border rounded-md p-6 md:col-span-2">
          <h2 className="font-medium mb-4">Personal Details</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <ProfileItem label="Name" value={user.name} />
            <ProfileItem label="Email" value={user.email} />
            <ProfileItem label="Branch" value={user.branch} />
            <ProfileItem label="Category" value={user.category} />
            <ProfileItem label="State" value={user.state} />
            <ProfileItem label="Gender" value={user.gender} />
          </div>
        </div>

        {/* Scholarship Stats (static for now) */}
        <div className="bg-white border rounded-md p-6">
          <h2 className="font-medium mb-4">Scholarship Stats</h2>

          <div className="space-y-4 text-sm">
            <Stat label="Applied" value="0" />
            <Stat label="Approved" value="0" />
            <Stat label="Rejected" value="0" />
            <Stat label="Pending" value="0" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default Profile;
