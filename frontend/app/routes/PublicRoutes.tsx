import React from "react";

const EntryPage = React.lazy(() => import("../pages/EntryPage"));
const AuthSignInPage = React.lazy(() => import("../pages/Auth/SignIn"));
const AuthSignUpPage = React.lazy(() => import("../pages/Auth/SignUp"));
const AuthForgotPasswordPage = React.lazy(
  () => import("../pages/Auth/ForgotPassword")
);
const AuthResetPasswordPage = React.lazy(
  () => import("../pages/Auth/ResetPassword")
);
const ChargingLoginPage = React.lazy(() => import("../pages/Charging/Login"));
const ConfirmRegisterPage = React.lazy(
  () => import("../pages/Auth/ConfirmSignUp")
);

export const publicRoutes = [
  {
    path: "/",
    component: AuthSignInPage,
    role: "none",
  },
  {
    path: "/auth-sign-in",
    component: AuthSignInPage,
    role: "none",
  },
  {
    path: "/auth-sign-up",
    component: AuthSignUpPage,
    role: "none",
  },
  {
    path: "/charging-login",
    component: ChargingLoginPage,
    role: "none",
  },
  {
    path: "/forgot-password",
    component: AuthForgotPasswordPage,
    role: "none",
  },
  {
    path: "/set-password",
    component: AuthResetPasswordPage,
    role: "none",
  },
  {
    path: "/confirm-register",
    component: ConfirmRegisterPage,
    role: "protected",
  },
];
