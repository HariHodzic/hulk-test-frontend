import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "..";

export default function Signup() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { signin } = auth;

  const loginMutation = useMutation((data) => {
    return axios
      .post(process.env.REACT_APP_HOST + "/auth/register", data)
      .then((response) => {
        setError(null);
        setResults(response.data);
        navigate("/login");
      })
      .catch(function (error) {
        setResults(null);
        console.log(error);
        setError(error);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    const res = await loginMutation.mutateAsync({
      username,
      password,
      repeatPassword,
    });

    if (results) {
      localStorage.setItem("accessToken", results.accessToken);
      signin(results.accessToken);
    }
  };
  const usernameRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  return (
    <div className="container">
      <div className="row d-flex justify-content-center pt-5">
        <div className="col-md-4">
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="form-group">
              <h2 style={{ color: "#33bab5" }}>Register</h2>
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
                className="form-control mb-3"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label>Repeat password</label>
              <input
                ref={repeatPasswordRef}
                type="password"
                className="form-control"
                id="repeatPassword"
                placeholder="Repeat password"
              />
              {error ? (
                <div>
                  <span style={{ color: "red" }}>
                    Check your inputs! Password must be 8 characters long and
                    contain uppercase and lowercase letters and numbers.
                  </span>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#33bab5" }}
              className="btn justify-content-center btn-primary mt-3"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
