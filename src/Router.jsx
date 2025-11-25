import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: async () => {
        const data = await fetch("http://localhost:3000");
        return data;
      },
    },
  ]);
  return <RouterProvider router={router} />;
}
