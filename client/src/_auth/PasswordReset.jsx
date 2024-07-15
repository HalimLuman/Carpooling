import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PasswordReset = () => {
  const { t } = useTranslation();
  const { resettoken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(`${t("SIGNUP.notMatch")}`, {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return;
    }

    try {
      const response = await resetPassword({
        token: resettoken,
        password,
      }).unwrap();
      toast.success(response.data, { autoClose: 1500, pauseOnHover: false });
      navigate("/login");
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong", {
        autoClose: 1500,
        pauseOnHover: false,
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {t("SIGNIN.reset")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="newPassword" className="sr-only">
              {t("SIGNIN.newPass")}
            </label>
            <input
              type={showPassword.password ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[35%] text-n-8"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">
              {t("SIGNIN.confirmPass")}
            </label>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-n-1 border text-n-8 border-n-8/20 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-sky-700 p-3 rounded-lg"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[35%] text-n-8"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-sky-600 w-full py-2 text-n-1 font-bold tracking-wider rounded-md hover:bg-sky-700"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : `${t("SIGNIN.reset")}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
