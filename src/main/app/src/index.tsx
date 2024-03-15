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
import WelcomeLayout from "./layouts/WelcomeLayout.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import "@fontsource/lato";
import SearchLayout from "./layouts/SearchLayout.tsx";
import SuggestedLayout from "./layouts/SuggestedLayout.tsx";
import SuggestedPage from "./pages/SuggestedPage.tsx";

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
    path: "/welcome",
    element: (
      <WelcomeLayout>
        <WelcomePage />
      </WelcomeLayout>
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
