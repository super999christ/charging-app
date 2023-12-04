import React from "react";

const AuthSignInPage = React.lazy(() => import("../pages/Auth/SignInWithPin"));
const AuthSignUpPage = React.lazy(() => import("../pages/Auth/SignUpWithPin"));
const AuthForgotPasswordPage = React.lazy(
  () => import("../pages/Auth/ForgotPassword")
);
const AuthResetPasswordPage = React.lazy(
  () => import("../pages/Auth/ResetPassword")
);
const ChargingStationPage = React.lazy(() => import("../pages/Charging/Station"));

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
    path: "/charging-station",
    component: ChargingStationPage,
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
];
