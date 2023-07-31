import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import FadeLoader from "react-spinners/FadeLoader";
import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdCheck,
  MdClose,
} from "react-icons/md";
import { toast } from "react-toastify";
import { FcLock, FcUnlock } from "react-icons/fc";

function User() {
  // state for data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // state for filter
  const [selectedFilters, setSelectedFilters] = useState({
    name: "",
    status: "",
  });

  // state for asc order sort
  const [sortOrder, setSortOrder] = useState("asc");

  // state for loader
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center justify-center space-x-2">
          {row.status === "active" ? (
            <div className="bg-green-500 text-white px-4 py-2 rounded flex ">
              Active
            </div>
          ) : (
            <div className="bg-red-500 text-white px-4 py-2 rounded flex">
              Unactive
            </div>
          )}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-500 hover:text-blue-600"
          >
            <MdOutlineModeEditOutline size={24} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 hover:text-red-600"
          >
            <MdDeleteOutline size={24} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleEdit = (row) => {
    setSelectedUser(row);
    setUsername(row.username);
    setEmail(row.email);
    setShowEditPopup(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      // Make a PUT request to the API endpoint with the updated user data
      const updatedUser = {
        ...selectedUser,
        username: username,
        email: email,
      };

      await axios.put(
        `http://localhost:5000/user/${selectedUser.id}`,
        updatedUser
      );

      // If the update request is successful, update the data and filteredData states
      const updatedData = data.map((user) =>
        user.id === selectedUser.id ? updatedUser : user
      );
      setData(updatedData);
      setFilteredData(updatedData);

      // Optionally, you can show a success message or perform any other actions after the update
      console.log("User updated successfully:", updatedUser);
      toast.success("User updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      // If there's an error with the update request, handle the error appropriately
      console.error("Error updating user:", error);
      // You can show an error message or perform any other actions to handle the error
    }
  };

  const handleCancelUpdate = () => {
    setSelectedUser(null);
    setUsername("");
    setEmail("");
    setShowEditPopup(false);
  };

  const handleDelete = async (row) => {
    try {
      // Make a DELETE request to the API endpoint with the user ID (row.id) as the URL parameter
      await axios.delete(`http://localhost:5000/user/${row.id}`);

      // If the delete request is successful, update the data and filteredData states
      const updatedData = data.filter((item) => item.id !== row.id);
      setData(updatedData);
      setFilteredData(updatedData);

      // Optionally, you can show a success message or perform any other actions after the delete
      console.log("User deleted successfully:", row.username);
      toast.success("User deleted successfully:", row.username);
    } catch (error) {
      // If there's an error with the delete request, handle the error appropriately
      console.error("Error deleting user:", error);
      // You can show an error message or perform any other actions to handle the error
    }
  };
  // api
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user");
      if (response.status == 200) {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // call api ftn after 3sec delay
  useEffect(() => {
    const delay = 3000; // 3 seconds

    const timer = setTimeout(() => {
      fetchData();
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  //   const handleDelete = (row) => {
  //     const updatedData = data.filter((item) => item.id !== row.id);
  //     setData(updatedData);
  //     setFilteredData(updatedData);
  //   };

  const handleFilterChange = (fieldName, selectedOptions) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [fieldName]: selectedOptions,
    }));

    if (selectedOptions.length === 0) {
      setFilteredData(data);
    }
  };

  const handleFilter = () => {
    let filteredResults = data;
  
    if (selectedFilters.username && selectedFilters.username.length > 0) {
      filteredResults = filteredResults.filter((row) =>
        selectedFilters.username.some(
          (username) => username.value === row.username
        )
      );
    }
  
    if (selectedFilters.status && selectedFilters.status.length > 0) {
      filteredResults = filteredResults.filter((row) =>
        selectedFilters.status.some((status) => status.value === row.status)
      );
    }
  
    setFilteredData(filteredResults);
  };
  

  const handleClearFilters = () => {
    setSelectedFilters({
      username: "",
      status: "",
    });
    setFilteredData(data);
  };

  const handleFilterActive = () => {
    const filteredResults = data.filter((row) => row.status === "active");
    setFilteredData(filteredResults);
  };

  const handleFilterUnactive = () => {
    const filteredResults = data.filter((row) => row.status === "unactive");
    setFilteredData(filteredResults);
  };

  const handleSortAsc = () => {
    const sortedResults = [...filteredData].sort((a, b) =>
      a.username.localeCompare(b.username)
    );
    setSortOrder("asc");
    setFilteredData(sortedResults);
  };

  const handleSortDesc = () => {
    const sortedResults = [...filteredData].sort((a, b) =>
      b.username.localeCompare(a.username)
    );
    setSortOrder("desc");
    setFilteredData(sortedResults);
  };

  const nameOptions = data.map((row) => ({
    value: row.username,
    label: row.username,
  }));

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "unactive", label: "Unactive" },
  ];

  return (
    <div className="mx-6 my-4">
      <h2 className="mb-4 font-bold text-3xl">Users</h2>

      <div className="bg-white rounded-lg shadow-md rounded-tr-lg rounded-tl-lg mt-4">
        <div className="flex mb-8">
          <div className="flex-1  rounded-lg bg-[#982176] px-2 pb-8 pt-4">
            <h2 className="font-semibold text-white text-lg pl-6">Search:</h2>
            <div className="flex flex-wrap flex-col items-center px-6  gap-4 mt-2">
              <div className="flex w-full items-center gap-4 px-6 ">
                <div className="flex-1">
                  <Select
                    isMulti
                    options={nameOptions}
                    value={selectedFilters.name}
                    onChange={(selectedOptions) =>
                      handleFilterChange("name", selectedOptions)
                    }
                    placeholder="Search name"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    isMulti
                    options={statusOptions}
                    value={selectedFilters.status}
                    onChange={(selectedOptions) =>
                      handleFilterChange("status", selectedOptions)
                    }
                    placeholder="Search status"
                  />
                </div>
                <div>
                  <button
                    onClick={handleFilter}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow-lg"
                  >
                    Apply Search
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleClearFilters}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow-lg"
                  >
                    Clear{" "}
                  </button>
                </div>
              </div>
              <div className="w-[700px] border-[1px] rounded-full bg-gray-400 mt-2"></div>
              <div className="flex w-full justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-white">Filter By:</h3>

                  <div className="flex items-center gap-8 py-2 px-6">
                    <div>
                      <button
                        onClick={handleFilterActive}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Active Users
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleFilterUnactive}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Unactive Users
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white ">Sort By:</h3>
                  <div className="flex items-center gap-8 py-2 px-6">
                    <div>
                      <button
                        onClick={handleSortAsc}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Ascending
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleSortDesc}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg"
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* check for loader and table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            {/* fade loader if loading true */}
            <FadeLoader color="#FD8D14" loading={loading} size={50} />
          </div>
        ) : (
          // if loading state false table
          <div className="mx-8">
            <DataTable
              className="w-full"
              columns={columns}
              data={filteredData}
              keyField="id"
              responsive
              striped
              highlightOnHover
              noHeader
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#068DA9",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  },
                  className: "text-center ",
                },
              }}
              pagination
              paginationPerPage={10}
              paginationDefaultPage={1}
              paginationRowsPerPageOptions={[10,20, 30, 40]}
            />
          </div>
        )}
      </div>

{/* update user card */}
      {showEditPopup && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black">
          <div className="bg-white px-10 py-10 rounded-lg">
            <h3 className="text-lg text-center text-yellow-600  font-bold mb-4">
              Update User
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-yellow-500"
              />
            </div>
            {/* Enable/Disable User Buttons */}
            {selectedUser.status === "active" ? (
              <FcUnlock
                size={38}
                className="text-green-500 hover:text-green-600 cursor-pointer"
                onClick={() =>
                  setSelectedUser({ ...selectedUser, status: "unactive" })
                }
              />
            ) : (
              <FcLock
                size={38}
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() =>
                  setSelectedUser({ ...selectedUser, status: "active" })
                }
              />
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelUpdate}
                className="bg-red-500 hover:bg-red-600 mr-4 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
