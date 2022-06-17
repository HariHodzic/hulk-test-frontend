import axios from "axios";
import React from "react";
import { Comment, NewComment } from "./comments";

function removePost(id) {
  axios
    .delete(process.env.REACT_APP_HOST + "/posts/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      return error.message;
    });
}

export function Post(props) {
  const { post, all } = props;
  const { id, title, description, dateTime, author, comments } = post;
  const { username } = author;
  return (
    <div className="container py-4 text-dark">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-11 col-lg-12 col-xl-7">
          {!all ? (
            <button
              className="btn btn-remove d-flex justify-content-start"
              onClick={() => {
                return removePost(id);
              }}
            >
              X
            </button>
          ) : null}
          <div className="d-flex flex-start mt-2">
            <div className="card w-100" style={{ border: "2px solid #33bab5" }}>
              <div className="card-body p-4">
                <div className="" style={{ borderBottom: "3px solid #33bab5" }}>
                  <h5>{title}</h5>
                  <p className="small">
                    {username} - {dateTime.split("T")[0]}
                  </p>
                  <p>{description}</p>
                </div>
                {
                  <section>
                    {post.comments.length > 0
                      ? post.comments.map((element) => {
                          return <Comment key={element.id} post={element} />;
                        })
                      : null}
                  </section>
                }
                {<NewComment postId={id} all={all}></NewComment>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
