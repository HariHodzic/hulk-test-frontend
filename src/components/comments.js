import axios from "axios";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

export function Comment(props) {
  const { post } = props;
  const { content, author } = post;

  return (
    <div className="d-flex flex-start mt-0 mb-2 py-0">
      <div
        className="card w-100"
        style={{ border: "2px solid light-grey", fontSize: "8" }}
      >
        <div className="card-body p-1">
          <div className="">
            <h6>{author.username}</h6>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewComment(props) {
  const navigate = useNavigate();
  const { postId, all } = props;

  const commentRef = useRef();

  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState(null);

  const newCommentMutation = useMutation((data) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      return axios
        .post(process.env.REACT_APP_HOST + "/comments", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setComment(response.data);
          setPostComments([...postComments, response.data]);
          const form = document.getElementById("newCommentForm");
          form.reset();
        })
        .catch(function (error) {
          setComment(null);
          console.log(error.message);
        });
    }
  });

  const subimtComment = async (e) => {
    e.preventDefault();
    const content = commentRef.current.value;
    if (content !== "") {
      const res = await newCommentMutation.mutateAsync({
        postId,
        content,
      });
    }
  };

  return (
    <div>
      {
        <section>
          {postComments.map((element) => {
            return <Comment key={element.id} post={element} />;
          })}
        </section>
      }
      <form id="newCommentForm" onSubmit={subimtComment}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new comment"
            aria-label="Add new comment"
            ref={commentRef}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Add
          </button>
          {all ? null : (
            <NavLink
              className="btn btn-outline-secondary"
              type="button"
              to={`/updatePost/${postId}`}
            >
              Edit
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
}
