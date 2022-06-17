import axios from "axios";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdatePost() {
  const { id } = useParams();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery("postGet", async () => {
    const response = await axios.get(
      process.env.REACT_APP_HOST + "/posts/" + id
    );
    return response.data;
  });

  const queryClient = useQueryClient();
  console.log({ data });

  const postsMutation = useMutation(
    (data) => {
      return axios
        .put(process.env.REACT_APP_HOST + "/posts/" + id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setError(null);
          setResults(response.data);
          navigate("/myposts");
        })
        .catch(function (error) {
          setResults(null);
          setError(error);
        });
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("postGet");
      },
    }
  );

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

  if (isLoading) {
    return "Loading";
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center pt-5">
        <div className="col-md-4">
          <form id="loginform" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                defaultValue={data.title}
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
                defaultValue={data.description}
                ref={descriptionRef}
                type="textArea"
                className="form-control"
                id="Description"
                placeholder="Description"
              />
              {error ? (
                <div>
                  <span style={{ color: "red" }}>{error.message}</span>
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="btn  mt-3"
              style={{ backgroundColor: "#33bab5", color: "white" }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
