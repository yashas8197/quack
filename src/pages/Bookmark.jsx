import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { fetchPosts } from "../utils/postSlice";

const Bookmark = () => {
  const dispatch = useDispatch();
  const { error, posts, status } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const bookMarkedPosts = posts.filter((post) => post.isMarked === true);

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
      {bookMarkedPosts.length > 0 ? (
        <ul className="list-group">
          {bookMarkedPosts?.map((post) => (
            <li className="list-group-item" key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-secondary h3">
          You have not added any Bookmarks!
        </p>
      )}
    </div>
  );
};

export default Bookmark;
