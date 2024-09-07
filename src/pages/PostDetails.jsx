// PostDetails.js
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPostById, resetCurrentPost } from "../utils/postSlice";

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { error, currentPost, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(resetCurrentPost());
    dispatch(fetchPostById(postId));
  }, [postId, dispatch]);

  if (currentPost === null) return null;

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
      {status === "loading" && <div className="text-center"></div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      {currentPost && <PostCard post={currentPost} />}
    </div>
  );
};

export default PostDetails;
