import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const dispatch = useDispatch();

  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container" style={{ height: "92vh", overflowY: "scroll" }}>
      {status === "loading" && <div className="text-center">Loading...</div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post._id} className="list-group-item ">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
