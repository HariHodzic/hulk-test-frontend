import axios from "axios";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const postsMutation = useMutation((data) => {
    return axios
      .post(process.env.REACT_APP_HOST + "/posts/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setError(null);
        setResults(response.data);
        navigate("/");
      })
      .catch(function (error) {
        setResults(null);
        setError(error);
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const res = await postsMutation.mutateAsync({
      title,
      description,
    });
  };

  const titleRef = useRef();
  const descriptionRef = useRef();

  return (
    <div className="container">
      <div className="row d-flex justify-content-center pt-5">
        <div className="col-md-4">
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                ref={titleRef}
                type="title"
                className="form-control mb-3"
                id="titleInput"
                name="titleInput"
                placeholder="Enter Title"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                ref={descriptionRef}
                type="textArea"
                className="form-control"
                id="Description"
                placeholder="Description"
              />
              {error ? (
                <div>
                  <span style={{ color: "red" }}>All fields are required.</span>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn  mt-3"
              style={{ backgroundColor: "#33bab5", color: "white" }}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
