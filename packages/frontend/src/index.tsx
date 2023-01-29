import React, { FC } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CreateKiosk from "./pages/CreateKiosk";
import EditKiosk from "./pages/EditKiosk";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <CreateKiosk />,
  },
  {
    path: "/edit/:id",
    element: <EditKiosk />,
  },
]);

const Wrapper: FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="h-screen w-full bg-neutral-900 text-white p-10 space-y-5">
    {children}
  </div>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
  </React.StrictMode>
);
