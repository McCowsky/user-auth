import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthProvider";
const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "must be between 5 and 25 characters")
      .max(25, "must be between 5 and 25 characters"),
    email: z.string().min(3, "cannot be empty").email("must be proper email format"),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Must be at least 8 characters"),
    confPassword: z.string().min(8),
  })
  .superRefine(({ confPassword, password }, ctx) => {
    if (confPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confPassword"],
        message: "The passwords did not match",
      });
    }
  });

type IRegister = z.infer<typeof registerSchema>;

const Register = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: IRegister) => {
    console.log(data);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          label="username"
          placeholder="Username"
          {...register("name")}
        />
        <Typography>{errors.name?.message}</Typography>
        <TextField
          type="email"
          label="email"
          placeholder="Email"
          {...register("email")}
        />
        <Typography>{errors.email?.message}</Typography>

        <TextField
          type="password"
          label="password"
          placeholder="Password"
          {...register("password")}
        />
        <Typography>{errors.password?.message}</Typography>

        <TextField
          type="password"
          placeholder="Confirm password"
          {...register("confPassword")}
        />
        <Typography>{errors.confPassword?.message}</Typography>

        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </form>
      <Typography>
        <Link to="/">or sign in</Link>
      </Typography>
    </Box>
  );
};

export default Register;
