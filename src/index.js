import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Comments from "./pages/Comments";
import Search from "./pages/Search";
import AllChats from "./pages/AllChats";
import Chat from "./pages/Chat";
import ErrorPage from "./pages/ErrorPage";
import { Provider } from "react-redux";
import store from "./store/store.js";
import CheckUser from "./authentication/CheckUser";
import UserIsAuthenticated from "./authentication/UserIsAuthenticated";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_API_URL);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckUser>
            <Home socket={socket} />
          </CheckUser>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/profile",
        element: (
          <CheckUser>
            <Profile socket={socket} />
          </CheckUser>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <CheckUser>
            <EditProfile />
          </CheckUser>
        ),
      },
      {
        path: "/posts/:postId/comments",
        element: (
          <CheckUser>
            <Comments />
          </CheckUser>
        ),
      },
      {
        path: "/search",
        element: (
          <CheckUser>
            <Search />
          </CheckUser>
        ),
      },
      { //⭐⭐ test homePage with limit fetching and page skipping✅
        path: "/user/:theirusername", // search user✅, follow & unfollow✅,socket in follow & unfollow✅, edit profile with add photo✅,patch & delete request
        element:(<CheckUser>
          <Profile socket={socket}/>
        </CheckUser>) // add & delete comment✅, this isn't good (so ditch it) at small data: show home posts properly according to friends list
      }, // messages page✅, Now connect socket to make it faster. all these functions should be added //⭐⭐Profile page desing having so many errors
      {
        path:"/messages",
        element:(<CheckUser>
          <AllChats/>
        </CheckUser>)
      },
      {
        path:"/messages/:anotherUserId",
        element:(<CheckUser>
          <Chat socket={socket}/>
        </CheckUser>)
      }
    ],
  },
  {
    path: "*",
    element: (
        <ErrorPage />
    ),
  },
  {
    path: "/login",
    element: (
      <UserIsAuthenticated>
        <Login />
      </UserIsAuthenticated>
    ),
  },
  {
    path: "/signup",
    element: (
      <UserIsAuthenticated>
        <SignUp />
      </UserIsAuthenticated>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
