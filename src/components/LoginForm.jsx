import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import im from "../assets/1.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";

const LoginForm = () => {
  // State variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const navgate = useNavigate();

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  // Initialize useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Submit logic goes here
      try {
        const response = await axios.get(
          `http://localhost:5000/user?email=${values.email}`
        );
        console.log(response.data);

        if (response.data.length === 0) {
          // User with the same username and email already exists
          console.log("Enter valide email!");
        } else {
          const user = response.data[0];

          if (user.status === "active") {
            if (
              user.email === "admin@gmail.com" &&
              user.password === values.password
            ) {
              const updatedUser = { ...user, login: "yes" };
              await axios.put(
                `http://localhost:5000/user/${user.id}`,
                updatedUser
              );
              console.log("admin");
              toast.success("Successfully login as admin.");

              navgate("/Dashboard");
            } else {
              if (user.password === values.password) {
                const updatedUser = { ...user, login: "yes" };
                await axios.put(
                  `http://localhost:5000/user/${user.id}`,
                  updatedUser
                );

                navgate("/userdashboard");

                console.log("user ");
                toast.success("Successfully login as user.");
              } else {
                toast.error("Please enter valide password.");
              }
            }
          } else {
            console.log("Your baind for now .");
            toast.error("you are baind for now.");
          }
        }
      } catch (error) {
        console.error("Error checking user:", error);
        toast.error("Error checking user!");
      }
    },
  });

  return (
    <div className="bg-yellow-100 overflow-x-hidden lg:overflow-x-auto lg:overflow-hidden flex items-center justify-center h-[100vh] lg:h-screen">
      <div className="container w-full lg:w-4/5 lg:bg-white h-screen lg:h-screen-75 lg:border border-gray-300 rounded-lg flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-between group">
        {/* Product Side */}
        <div className="w-full lg:w-1/2 h-28 lg:h-full mt-32 lg:mt-0 lg:bg-theme-yellow-dark flex relative order-2 lg:order-1 rounded">
          {/* ...product text */}
          <div className="text-center hidden lg:flex items-center justify-start h-full w-full">
            <span className="block whitespace-nowrap h-full -rotate-90 text-[40px] 2xl:text-[70px] font-black uppercase text-yellow-300 opacity-0 transition-all group-hover:opacity-100 ml-10 2xl:ml-12 group-hover:-ml-20 2xl:group-hover:ml-26 lg:group-hover:ml-20 duration-1000 lg:duration-700 ease-in-out">
              Learn With Adnan
            </span>
          </div>
          {/* ...product text */}

          {/* ...product image */}
          <div className="absolute right-0 bottom-0 flex items-center lg:justify-center w-full opacity-50 lg:opacity-100">
            <img
              src={im}
              alt="product"
              className="-mb-5 lg:mb-0 -ml-12 lg:ml-0 product h-[500px] xl:h-[700px] 2xl:h-[900px] w-auto object-cover transform group-hover:translate-x-26 2xl:group-hover:translate-x-48 transition-all duration-1000 lg:duration-700 ease-in-out"
            />
            {/* ...product shadow */}
            <div className="shadow w-full h-5 bg-black bg-opacity-25  blur absolute bottom-0 lg:bottom-14 left-0 lg:left-24 rounded-full transform "></div>
          </div>
          {/* ...product image */}

          <div className="hidden lg:block w-1/3 bg-white ml-auto"></div>
        </div>
        {/* Product Side End */}

        {/* Login Form */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-wrapper flex items-center lg:h-full px-10 relative z-10 pt-16 lg:pt-0">
              <div className="w-full space-y-5">
                {/* form caption */}
                <div className="form-caption flex items-end justify-center text-center space-x-3 mb-16 mt-14">
                  <span className="text-3xl font-semibold text-theme-yellow-dark">
                    Login
                  </span>
                  <span className="text-base text-gray-800">Form</span>
                </div>
                {/* // Email input */}
                <div className="form-element flex flex-col">
                  <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                    <span className="block text-lg text-gray-800 mr-64">
                      Email
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="bg-yellow-100 lg:bg-white rounded-lg border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 ml-14">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                {/* // Password input */}
                <div className="form-element relative">
                  <label className="space-y-2 w-full lg:w-4/5 block mx-auto">
                    <span className="block text-lg text-gray-800 mr-60">
                      Password
                    </span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"} // Use 'text' when showPassword is true, and 'password' when false
                        placeholder="Enter your password"
                        className="bg-yellow-100 lg:bg-white rounded-lg border lg:border-2 border-gray-400 lg:border-gray-200 w-full p-3 pr-10 focus:outline-none active:outline-none focus:border-gray-400 active:border-gray-400"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {/* Show/Hide Password Icon */}
                      <span
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                          showPassword ? "text-yellow-500" : "text-gray-500"
                        }`}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <RiEyeFill size={22} />
                        ) : (
                          <RiEyeCloseFill size={22} />
                        )}
                      </span>
                    </div>
                  </label>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 ml-14">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                {/* ... form elements */}
                <div className="form-element">
                  <span className="w-full lg:w-3/5 block mx-auto ">
                    <input
                      type="submit"
                      value="Login"
                      className="cursor-pointer text-white  text-lg font-bold rounded-full w-full p-3 bg-theme-yellow-dark focus:outline-none active:outline-none focus:bg-theme-yellow active:bg-theme-yellow hover:bg-theme-yellow transition-all"
                    />
                  </span>
                </div>
                {/* I have no account text */}
                <div className="text-center text-gray-700">
                  I have no account,{" "}
                  <Link to="/signup" className="text-blue-500 underline">
                    Signup
                  </Link>{" "}
                  here.
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Login Form End */}
      </div>
    </div>
  );
};

export default LoginForm;
