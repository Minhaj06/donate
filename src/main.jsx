import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "antd/dist/reset.css";
import "./index.css";
import HomePage from "./pages/homePage/HomePage.jsx";
import CompletedDonationsPage from "./pages/completedDonationsPage/CompletedDonationsPage.jsx";
import DonatePage from "./pages/donatePage/DonatePage.jsx";
import CompanyPage from "./pages/companyPage/CompanyPage.jsx";
import ApplyPage from "./pages/applyPage/ApplyPage.jsx";
import BeVolunteer from "./pages/beVolunteer/BeVolunteer.jsx";
import { ConfigProvider } from "antd";
import Test from "./pages/test.jsx";

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
      {
        path: "/apply",
        element: <ApplyPage />,
      },
      {
        path: "/be-volunteer",
        element: <BeVolunteer />,
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#198f51",
          colorSecondary: "red",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
