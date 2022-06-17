import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "..";

export default function Login() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const { signin } = auth;
  const navigate = useNavigate();

  const loginMutation = useMutation((data) => {
    return axios
      .post(process.env.REACT_APP_HOST + "/auth/signin", data)
      .then((response) => {
        setError(null);
        localStorage.setItem("accessToken", response.data.accessToken);
        signin(response.data.accessToken);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error.message);
        setResults(null);
        setError(error);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const res = await loginMutation.mutateAsync({
      username,
      password,
    });
  };
  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="container">
      <div className="row d-flex justify-content-center pt-5">
        <div className="col-md-4">
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="form-group">
              <h2 style={{ color: "#33bab5" }}>Login</h2>
              <label>Username</label>
              <input
                ref={usernameRef}
                type="username"
                className="form-control mb-3"
                id="UsernameInput"
                name="UsernameInput"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                ref={passwordRef}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              {error ? (
                <div>
                  <span className="red" style={{ color: "red" }}>
                    Incorrect username or password!
                  </span>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#33bab5" }}
              className="btn btn-secondary mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
