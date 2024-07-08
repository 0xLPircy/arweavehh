import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Project from "./pages/Project.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "project/:projectId",
    element: <Project />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "DISPATCH",
          "ACCESS_ALL_ADDRESSES",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
        ],
        ensurePermissions: true,
      }}
      theme={{
        radius: "minimal",
        titleHighlight: { r: 0, g: 109, b: 27 },
        accent: { r: 32, g: 81, b: 86 },
      }}
    >
      <RouterProvider router={router} />
    </ArweaveWalletKit>
  </React.StrictMode>
);
