import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const Signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh]">
      <div className="mx-auto w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl p-10 shadow-lg">
        <div className="flex justify-center">
          <span className="inline-block w-full">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-indigo-800 mb-2">
          Sign up to create an account
        </h2>
        {error && <p className="text-red-500 mt-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(Signup)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Name: "
              placeholder="Enter your Full Name"
              {...register("Name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid email",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        <p className="mt-2 text-center text-base text-gray-500">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
