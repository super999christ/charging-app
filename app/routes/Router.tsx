import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PublicRoutes";
import Spinner from "@root/components/Spinner";

function GlobalRouter() {
  return (
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
  );
}

export default GlobalRouter;
