import axios from "axios";
import React, { useEffect, useState } from "react";
import { Post } from "../../components/posts";

function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchPosts = () => {
      const response = axios
        .get(process.env.REACT_APP_HOST + "/posts")
        .then((response) => {
          setPosts(response.data);
        })
        .catch(function (error) {
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
        return <Post key={element.id} post={element} all={true} />;
      })}
    </section>
  );
}

export default Home;
