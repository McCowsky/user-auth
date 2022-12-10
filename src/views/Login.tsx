import { useForm } from "react-hook-form";
import { effect, z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "react-query";

import { Typography, Box, Button, TextField } from "@mui/material";

import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";

// const loginSchema = z.object({
//   name: z
//     .string()
//     .min(5, "must be between 5 and 25 characters")
//     .max(25, "must be between 5 and 25 characters"),
//   password: z
//     .string()
//     .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
//     .regex(new RegExp(".*[a-z].*"), "One lowercase character")
//     .regex(new RegExp(".*\\d.*"), "One number")
//     .regex(
//       new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
//       "One special character"
//     )
//     .min(8, "Must be at least 8 characters"),
// });

// type ILogin = z.infer<typeof loginSchema>;
interface ILogin {
  name: string;
  password: string;
}

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const postUsers = (user: any) => {
    return axios.post("https://api.trello-clone.com/api/columns", user);
  };

  const { mutate, error } = useMutation("postUser", postUsers);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    //resolver: zodResolver(loginSchema),
  });

  const onSubmit = (loginData: ILogin) => {
    mutate(loginData, {
      onSuccess: (data, variables, context) => {
        setAuth({
          auth: true,
          name: loginData.name,
          password: loginData.password,
          accessToken: data.data.accessToken,
        });
        navigate("/home");
      },
      onError: (error, variables) => {
        console.log(error);
      },
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h2">Sign In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          label="username or email"
          placeholder="Username"
          //{...register("name")}
        />
        <Typography>{errors.name?.message}</Typography>

        <TextField
          type="password"
          label="password"
          placeholder="Password"
          //{...register("password")}
        />
        <Typography>{errors.password?.message}</Typography>

        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </form>
      <Typography>
        <Link to="/register">or sign up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
