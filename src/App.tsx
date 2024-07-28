import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@lib/react-query";

import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import ErrorPage from "./error-page";

import "./styles/global.css";

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
