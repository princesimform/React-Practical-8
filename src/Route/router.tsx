import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import PageNotFound from "../components/PageNotFound";
import SignUp from "../components/SignUp";
import Welcome from "../components/Welcome";

console.log(Home());
console.log(<Home />);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "welcome",
    element: <Welcome />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
