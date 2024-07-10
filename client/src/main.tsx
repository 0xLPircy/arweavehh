import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Project from "./pages/Project.tsx";
import { Navbar, Footer } from "./components";
import User from "./pages/User.tsx";
import AddProject from "./pages/AddProject.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/project/:projectId",
    element: <Project />,
  },
  {
    path: "/profile",
    element: <User />,
  },
  {
    path: "/addProject",
    element: <AddProject />,
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
      <div className="font-[Rale-Regular] min-h-screen flex flex-col justify-between gap-12 lining-figures">
        <Navbar />
        <RouterProvider router={router} />
        <Footer />
      </div>
    </ArweaveWalletKit>
  </React.StrictMode>
);
