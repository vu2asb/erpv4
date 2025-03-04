"use client";

import { Poppins } from "next/font/google";
import { LoginForm } from "@/components/auth/login-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
