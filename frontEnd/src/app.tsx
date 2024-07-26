import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TripDetailsPage } from "./pages/trip-details";
import { CreateTripPage } from "./pages/create-trip";
import { ErrorPage } from "./pages/error-page";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <CreateTripPage/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage/>,
    errorElement: <ErrorPage/>
  }
]);

export function App(){
  return(
    <RouterProvider router={router}/>
  )
}