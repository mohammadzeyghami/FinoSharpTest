// src/components/Login.js
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "@/components/molecules/providers/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "@/apis/axios";

// Define a validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const Login = () => {
  // @ts-ignores
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate(); // For navigating between pages
  const axiosInstance = useAxios(); // Custom axios instance with interceptors

  // Set up form handling with React Hook Form
  const {
    register, // Connect input fields to the form
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Access form validation errors
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup validation with React Hook Form
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      // Send login request to the server
      const response = await axiosInstance.post("/auth/login", data);

      // Extract accessToken and refreshToken from the server response
      const { accessToken, refreshToken } = response.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Inform AuthContext that the user is logged in
      login();

      // Redirect the user to the dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email")} // Connect input to form handling
          />
          <p className="error-message">{errors.email?.message}</p>{" "}
          {/* Display validation error for email */}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password")} // Connect input to form handling
          />
          <p className="error-message">{errors.password?.message}</p>{" "}
          {/* Display validation error for password */}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
