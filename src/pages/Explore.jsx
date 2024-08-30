// Explore.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import PostCard from "../components/PostCard";

const Explore = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "auto",
        height: "92vh",
        overflowY: "scroll",
        padding: "1rem",
      }}
    >
      {status === "loading" && <div className="text-center">Loading...</div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post._id} className="list-group-item">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
