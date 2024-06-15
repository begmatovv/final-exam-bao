import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import { Home, Signin, Signup, Create, Cart } from "./pages";
import { SingleRecept, ProtectedRotes } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { login } from "./hooks/useRegister";
import { authReady } from "./features/user/userSlice";

import { action as signupAction } from "./pages/Signup";
import { action as signinAction } from "./pages/Signin";

import { loader as singleReceptLoader } from "./components/SingleRecept";

function App() {
  const { user, authReadyState } = useSelector((state) => state.userState);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRotes user={user}>
          <MainLayout />
        </ProtectedRotes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/singleRecept/:id",
          element: <SingleRecept />,
          loader: singleReceptLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Signin />,
      action: signinAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: signupAction,
    },
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authReady());
    });
  }, []);
  return <>{authReadyState && <RouterProvider router={routes} />}</>;
}

export default App;
