import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  // Fetch user Profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // After login set user
      await fetchUserProfile();
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg("Registratation failed. Please try again");
      return {
        success: false,
        message: "Registratation failed. Please try again",
      };
    }
  };

  // Resent Activation
  const resendActivation = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/users/resend_activation/", userData);
      return {
        response: response,
        success: true,
        message:
          "Another email is sent please check your Mail Box",
      };
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  // Forgot Password
  const forgotPassowrd = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/users/reset_password/", userData);
      return {
        response: response,
        success: true,
        message:
          "Check you mail box an Email has been sent",
      };
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  // Confirm New Password
  const confirmNewPassword = async (Data) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/users/reset_password_confirm/", Data);
      return {
        response: response,
        success: true,
        message:"Your password has been reset",
      };
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, errorMsg, loginUser, registerUser, logoutUser , resendActivation,forgotPassowrd,confirmNewPassword};
};

export default useAuth;