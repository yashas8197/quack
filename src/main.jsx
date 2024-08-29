import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Profile from "./pages/Profile.jsx";
import Bookmark from "./pages/Bookmark.jsx";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import PostDetails from "./pages/PostDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/post-details/:postId",
        element: <PostDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
