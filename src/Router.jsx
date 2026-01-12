import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { userLogged } from "./components/helperFunctions";
import Home from "./components/home/home";
import SignUp from "./components/sign-up/sign-up";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: async () => {
        const data = await userLogged();
        return data;
      },
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return <RouterProvider router={router} />;
}
