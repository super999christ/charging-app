import React, { memo } from "react";
import { Route, Routes } from "react-router";
import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PublicRoutes";
import WithSuspense from "./WithSuspense";
import ToastProvider from "./ToastProvider";

type RouteParam = {
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  role?: string;
  redirect?: string;
};

export const allRoutes = [...publicRoutes, ...privateRoutes].map(
  (route: RouteParam) => {
    const Component = WithSuspense(route.component);
    function WrapperComponent() {
      return <Component />;
    }

    return {
      ...route,
      component: memo(WrapperComponent),
    };
  }
);

function GlobalRouter() {
  return (
    <ToastProvider>
      <Routes>
        {allRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </ToastProvider>
  );
}

export default GlobalRouter;
