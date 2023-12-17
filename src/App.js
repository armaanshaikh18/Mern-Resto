// import "./App.css";
import RootRoute from "./RootRoute";
import Login from "./screens/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import { CartContext } from "./components/ContextReducer";
import CartData from "./screens/CartData";
import MyOrder from "./screens/MyOrder";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/cart",
          element: <CartData />,
        },
        {
          path: "/myorders",
          element: <MyOrder />,
        },
      ],
    },
  ]);

  return (
    <CartContext>
      <RouterProvider router={router} />
    </CartContext>
  );
}

export default App;
