import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.css";

import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "trip-details/:tripId",
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
