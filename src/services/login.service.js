import axios, { post } from "axios";

export function signIn(username, password) {
  const result = axios
    .post(process.env.REACT_APP_HOST + "/auth/signin", { username, password })
    .catch((error) => this._handleHttpError(error));

  const accessToken = result.data.accessToken;
  this.saveToken(accessToken);
  return result.data.username;
}
