import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuthContext from '../hooks/useAuthContext';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";

const ConfirmNewPassword = () => {
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

//   const navigate = useNavigate();
  const navigate = useNavigate();
  const { errorMsg, confirmNewPassword } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { uid, token } = useParams();
    const [response, setResponse] = useState({uid, token});

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        const payload = { ...response, ...data };
        const apiResponse = await confirmNewPassword(payload); 
        setResponse(apiResponse);
        navigate("/login");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {errorMsg && <ErrorAlert error={errorMsg} />}
          {response?.success && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{response.message}</span>
            </div>
          )}
          <h2 className="card-title text-2xl font-bold">Reset Your password</h2>
          <p className="text-base-content/70">
            Enter new password for your Account
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  // minLength: {
                  //   value: 8,
                  //   message: "Password must be at least 8 characters",
                  // },
                })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input input-bordered w-full"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Password do not match",
                })}
              />
              {errors.confirm_password && (
                <span className="label-text-alt text-error">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
    );
};

export default ConfirmNewPassword;