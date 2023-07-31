import React, { useEffect, useState } from "react";
import { FiSettings, FiLogOut, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Usernavbar() {
  const [user, setUser] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user?login=yes"
        );
        if (response.status === 200 && response.data.length > 0) {
          setUser(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    if (user) {
      const updatedUser = { ...user, login: "no" };
      try {
        await axios.put(`http://localhost:5000/user/${user.id}`, updatedUser);
        toast.success("Logout successfully.");
        navigate("/");
        setUser(updatedUser); // Update the user state to reflect the logout changes
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  const handleProfileClick = () => {
    setShowProfilePopup(true);
  };

  const handleClosePopup = () => {
    setShowProfilePopup(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/${user.id}`,
        user
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully.");
        const updatedUser = { ...user, login: "no" };
        await axios.put(`http://localhost:5000/user/${user.id}`, updatedUser);

        navigate("/");
        setShowProfilePopup(false); // Close the profile popup after updating
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Profile update failed. Please try again.");
    }
  };

  return (
    <nav className="bg-white p-3 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <div className="text-black font-bold text-2xl">
        <p>User Panel</p>
      </div>

      {/* Icons and Profile Picture */}
      <div className="flex items-center space-x-4">
        {/* Setting Icon */}
        <FiSettings className="text-black text-xl hover:text-yellow-500" />

        {/* User Profile Icon */}
        <button
          onClick={handleProfileClick}
          className="text-black text-xl hover:text-yellow-500"
        >
          <div className="p-2  bg-yellow-500 rounded-full">
            <FiUser color="white" size={20} />
          </div>
        </button>

        {/* Logout Icon */}
        <FiLogOut
          onClick={handleLogout}
          className="text-black text-xl hover:text-yellow-500"
        />
      </div>
      {/* User Profile Popup */}
      {showProfilePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black">
          <div className="bg-white  py-10 rounded-lg w-[400px] px-14">
            <h3 className="text-lg text-center text-yellow-600 font-bold mb-4">
              User Profile
            </h3>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-600 font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={user?.username || ""}
                disabled
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
            {/* Add Email field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
            {/* Password field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user?.password || ""}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                />
                <button
                  onClick={handleTogglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {/* Confirm Password field */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-semibold"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={user?.confirmPassword || ""}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
                />
                <button
                  onClick={handleToggleConfirmPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="bg-red-500 hover:bg-red-600 mr-4 text-white px-4 py-2 rounded"
              >
                Close
              </button>
              <button
                onClick={handleUpdateProfile}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Usernavbar;
