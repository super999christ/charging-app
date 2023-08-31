import React, { Suspense, memo } from "react";
import { Route, Routes } from "react-router";
import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PublicRoutes";
import WithSuspense from "./WithSuspense";
import ToastProvider from "./ToastProvider";
import Spinner from "@root/components/Spinner";

// type RouteParam = {
//   path: string;
//   component: React.LazyExoticComponent<() => JSX.Element>;
//   role?: string;
//   redirect?: string;
// };

// export const allRoutes = [...publicRoutes, ...privateRoutes].map(
//   (route: RouteParam) => {
//     const Component = WithSuspense(route.component);
//     function WrapperComponent() {
//       return <Component />;
//     }

//     return {
//       ...route,
//       component: memo(WrapperComponent),
//     };
//   }
// );

function GlobalRouter() {
  return (
    <ToastProvider>
      <Routes>
        {[...publicRoutes, ...privateRoutes].map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<Spinner />}>
                <route.component />
              </Suspense>
            }
          />
        ))}
      </Routes>
    </ToastProvider>
  );
}

export default GlobalRouter;
