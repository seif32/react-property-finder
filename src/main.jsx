import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import HomePage from "./pages/HomePage";
import RootLayout from "./RootLayout";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import CreatePropertyPage from "./pages/CreatePropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import PropertyImagesPage from "./pages/PropertyImagesPage";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import BookmarksPage from "./pages/BookmarksPage";
import ProfilePage from "./pages/ProfilePage";
import AgentProfilePage from "./pages/AgentProfilePage";
import LocationBrowsePage from "./pages/LocationBrowsePage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "properties",
        element: <PropertyListingPage />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetailPage />,
      },
      {
        path: "properties/create",
        element: <CreatePropertyPage />,
      },
      {
        path: "properties/:id/edit",
        element: <EditPropertyPage />,
      },
      {
        path: "properties/:id/images",
        element: <PropertyImagesPage />,
      },
      {
        path: "my-properties",
        element: <MyPropertiesPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "agents/:id",
        element: <AgentProfilePage />,
      },
      {
        path: "locations",
        element: <LocationBrowsePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
