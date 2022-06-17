import { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import CreatePost from "./CreatePost";
import Signup from "./Signup";
import MyPosts from "./MyPosts";
import UpdatePost from "./UpdatePost";

function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterRoutes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route
              path="createPost"
              element={
                <RequireAuth>
                  <CreatePost />
                </RequireAuth>
              }
            />
            <Route
              path="myposts"
              element={
                <RequireAuth>
                  <MyPosts />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="updatePost/:id"
              element={
                <RequireAuth>
                  <UpdatePost />
                </RequireAuth>
              }
            ></Route>
          </Route>
        </RouterRoutes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Routes;

function RequireAuth(props) {
  const { children } = props;

  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = useState(localStorage.getItem("accessToken"));

  let signin = (newUser) => {
    setUser(newUser);
  };

  let signout = (callback) => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location = "/login";
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
