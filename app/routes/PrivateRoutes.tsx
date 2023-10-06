import BillingPlans from "@root/pages/Auth/BillingPlans/BillingPlans";
import React from "react";

const ProfilePage = React.lazy(() => import("../pages/Auth/Profile"));
const AuthDashboard = React.lazy(() => import("../pages/Auth/AuthDashboard"));
const AuthEmailSent = React.lazy(() => import("../pages/Auth/EmailSent"));
const ChargingStatus = React.lazy(() => import("../pages/Charging/Status"));
const UpdatePasswordPage = React.lazy(
  () => import("../pages/Auth/UpdatePassword")
);
const UpdateCreditPage = React.lazy(() => import("../pages/Auth/UpdateCredit"));
const ChargingHistoryPage = React.lazy(
  () => import("../pages/Charging/ChargingHistory")
);

export const privateRoutes = [
  {
    path: "/charging-status",
    component: ChargingStatus,
    role: "protected",
  },
  {
    path: "/charging-history",
    component: ChargingHistoryPage,
    role: "protected",
  },
  {
    path: "/dashboard",
    component: AuthDashboard,
    role: "protected",
  },
  {
    path: "/email-sent",
    component: AuthEmailSent,
    role: "protected",
  },

  {
    path: "/profile",
    component: ProfilePage,
    role: "protected",
  },

  {
    path: "/profile-password",
    component: UpdatePasswordPage,
    role: "protected",
  },
  {
    path: "/profile-creditcard",
    component: UpdateCreditPage,
    role: "protected",
  },
  {
    path: "/billing-plans",
    component: BillingPlans,
  }
];
