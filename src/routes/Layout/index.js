import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "..";

function Layout() {
  let auth = useAuth();

  return (
    <>
      <div style={{ backgroundColor: "#484848" }}>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom">
          <a
            href="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <h2 className="bi me-2" style={{ color: "#33bab5" }}>
              HulkApps Test
            </h2>
          </a>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                className="nav-link px-3"
                style={{ color: "#33bab5" }}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link px-3"
                style={{ color: "#33bab5" }}
                to="createPost"
              >
                New Post
              </NavLink>
            </li>
          </ul>

          {!auth.user ? (
            <div className="col-md-5 text-end">
              <NavLink className="mx-2" style={{ color: "#33bab5" }} to="login">
                LogIn
              </NavLink>
              <NavLink className="mx-2" style={{ color: "white" }} to="signup">
                Register
              </NavLink>
            </div>
          ) : (
            <div className="col-md-5 text-end">
              <NavLink className="mx-2" style={{ color: "white" }} to="myposts">
                My Posts
              </NavLink>
              <button
                className="btn mx-2"
                style={{ backgroundColor: "#33bab5" }}
                onClick={auth.signout}
              >
                LogOut
              </button>
            </div>
          )}
        </header>
      </div>

      <Outlet />
    </>
  );
}

export default Layout;
