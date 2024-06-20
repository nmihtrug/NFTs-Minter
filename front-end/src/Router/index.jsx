import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";

const RouterComponent = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
    ]);
    return <RouterProvider router={router} />
}

export default RouterComponent;