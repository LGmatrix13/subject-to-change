import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ScheduleLayout from "./layouts/ScheduleLayout.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import "./index.css";
import ProfessorsLayout from "./layouts/ProfessorsLayout.tsx";
import ProfessorsPage from "./pages/ProfessorsPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import "@fontsource/lato";
import SearchLayout from "./layouts/SearchLayout.tsx";
import SuggestedLayout from "./layouts/SuggestedLayout.tsx";
import SuggestedPage from "./pages/SuggestedPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <ScheduleLayout>
          <SchedulePage />
        </ScheduleLayout>
      </RootLayout>
    ),
  },
  {
    path: "/professors",
    element: (
      <RootLayout>
        <ProfessorsLayout>
          <ProfessorsPage />
        </ProfessorsLayout>
      </RootLayout>
    ),
  },
  {
    path: "/search",
    element: (
      <RootLayout>
        <SearchLayout>
          <SearchPage />
        </SearchLayout>
      </RootLayout>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: "/suggested",
    element: (
      <RootLayout>
        <SuggestedLayout>
          <SuggestedPage />
        </SuggestedLayout>
      </RootLayout>
    ),
  },
  {
    path: "/progress",
    element: (
      <RootLayout>
        <ProgressLayout>
          <ProgressPage />
        </ProgressLayout>
      </RootLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
