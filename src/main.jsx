import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/homePage/HomePage.jsx";
import CompletedDonationsPage from "./pages/completedDonationsPage/CompletedDonationsPage.jsx";
import DonatePage from "./pages/donatePage/DonatePage.jsx";
import CompanyPage from "./pages/companyPage/CompanyPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/donate",
        element: <DonatePage />,
      },
      {
        path: "/completed-donations",
        element: <CompletedDonationsPage />,
      },
      {
        path: "/company",
        element: <CompanyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
