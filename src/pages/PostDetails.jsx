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
  }, [postId]);

  return (
    <div className="container" style={{ height: "92vh", overflowY: "scroll" }}>
      {status === "loading" && <div className="text-center">Loading...</div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      <PostCard post={currentPost} />
    </div>
  );
};

export default PostDetails;
