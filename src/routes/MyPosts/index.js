import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Post } from "../../components/posts";

function MyPosts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = () => {
      const response = axios
        .get(process.env.REACT_APP_HOST + "/posts/myposts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch(function (error) {
          console.log(error.message);
          setPosts(null);
        });
    };

    fetchPosts();
  }, []);

  if (!posts?.length > 0) {
    return null;
  }

  return (
    <section>
      {posts.map((element) => {
        return <Post key={element.id} post={element} all={false} />;
      })}
    </section>
  );
}

export default MyPosts;
