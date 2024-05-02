import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import ProfilePreview from "./components/Profile/ProfilePreview";
import axios from "axios";
import AddPost from "./components/Post/AddPost";
import Auth from "./components/Authentication/Auth.jsx";
import Home from "./components/home/Home.jsx";
import Friends from "./components/Chat/Friends";
import Bar from "./components/Search/Bar";
import Notifications from "./components/Chat/Notification";
import Feed from "./components/Feed";
import PostZoom from "./components/Post/PostZoom";
import Messages from "./components/messages/Messages";
import { useSelector } from "react-redux";
import Chat from "./components/messages/Chat";
import { useLocation } from "react-router-dom";
import MessageLayout from "./components/messages/MessageLayout.jsx";
import Settings from "./components/settings/Settings";

function App() {
  const { _id } = useSelector((state) => state.profile);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader: async () => {
        var data;
        await axios
          .get("/api/user/checklogin")
          .then((res) => {
            //console.log(res.data);
            data = res.data;
          })
          .catch((err) => {
            console.log(err.message);
            return "Error";
          });
        return data;
      },
      children: [
        {
          path: "app",
          element: <AppLayout />,
          loader: async () => {
            var data;
            await axios
              .get("/api/post/getpost?pageLimit=2&n=0")
              .then((res) => {
                data = res.data;
              })
              .catch((err) => {
                console.log(err.message);
                return "Error";
              });
            return data;
          },
          children: [
            {
              path: "",
              element: <Feed/>,
            },
            {
              path: "friends",
              element: <Friends />,
            },
            {
              path: "search",
              element: <Bar />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
            {
              path: "messages",
              element: <MessageLayout />,
              children: [
                {
                  path: "",
                  element: <Messages />,
                  loader: async () => {
                    var data;
                    await axios.get(`/api/user/getFriends?id=${_id}`).then((res) => {
                      console.log(res.data);
                      data=res.data;
                    });
                    return data;
                  },
                },
                {
                  path:"chat/:id",
                  loader: async ({params})=>{
                    var data,messages;
                    console.log("hello"+params.id);
                    await axios.get(`/api/user/getUserById/${params.id}`).then((res) => {
                      data=res.data;
                    });
                    await axios.get(`/api/message/getMessage?senderId=${_id}&receiverId=${params.id}`).then((res) => {
                      messages=res.data;
                    }
                    );
                    console.log("hello1",{...messages});
                    return {data,messages};
                  },
                  element:<Chat/>
                }
              ]
            },
            {
              path: "post/:id",
              loader: async ({ params }) => {
                console.log("post=",params.id);
                var data2;
                await axios
                .get(`/api/post/getPostByPostId/${params.id}`)
                  .then((res) => {
                    data2 = res.data;
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return "Error";
                  });
                return data2;
              },
              element: <PostZoom />,
            },
            {
              path: "profile/:id",
              loader: async ({ params }) => {
                var data, data1;
                console.log(params.id);
                await axios
                  .get(`/api/user/getUserById/${params.id}`)
                  .then((res) => {
                    data = res.data;
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return "Error";
                  });
                await axios
                  .get(`/api/post/getpostById/${params.id}`)
                  .then((res) => {
                    data1 = res.data;
                  })
                  .catch((err) => {
                    console.log(err.message);
                    return "Error";
                  });
                return { data, data1 };
              },
              element: <ProfilePreview/>,
            },
            { path: "addpost", element: <AddPost /> },
            {
              path: "settings",element:<Settings/>
            }
          ],
        },
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
