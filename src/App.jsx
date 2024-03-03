import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import AddPost from "./components/Post/AddPost";
import Auth from "./components/Authentication/Auth.jsx"
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "app",
          element: <AppLayout />,
          loader: async() => {
            var data;
            await axios
              .get("/api/post/getpost")
              .then((res) => {
                data=res.data;
              })
              .catch((err) => {
                console.log(err.message);
                return "Error";
              });
              return data;
          },
        },
        { path: "profile", element: <Profile/> },
        { path: "addpost", element: <AddPost /> },
      ],
    },
    { path: "/auth", element: <Auth /> },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
