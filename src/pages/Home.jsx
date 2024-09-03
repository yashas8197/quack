import { SlidersHorizontal } from "lucide-react";
import AddPost from "../components/AddPost";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../utils/postSlice";
import PostCard from "../components/PostCard";
import { fetchUsers } from "../utils/userSlice";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const { error, posts, status } = useSelector((post) => post.posts);
  const user = useSelector((state) => state.users.usersList);

  const userFollowing = (
    user?.find((u) => u.username === "Katherine")?.following || []
  ).map((u) => u.username);

  const filteredUsers = posts.filter((post) =>
    userFollowing.includes(post.username)
  );

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const sortedPosts = (allPosts, sortBy) => {
    if (sortBy === "Latest") {
      const sortedPosts = allPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sortedPosts;
    }
    if (sortBy === "Oldest") {
      const sortedPosts = allPosts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return sortedPosts;
    } else {
      const sortedPosts = allPosts.sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
      return sortedPosts;
    }
  };

  return (
    <div className="container" style={{ height: "92vh", overflowY: "scroll" }}>
      <AddPost />
      <div className="d-flex justify-content-between py-4 px-3">
        <p>{selectedOption} Posts</p>

        <div className="btn-group">
          <SlidersHorizontal
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ cursor: "pointer" }}
          />
          <ul className="dropdown-menu">
            <li
              className="container"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect("Trending")}
            >
              <p className="text-white fw-bold">Trending</p>
            </li>
            <li
              className="container"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect("Oldest")}
            >
              <p className="text-white fw-bold">Oldest</p>
            </li>
            <li
              className="container"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect("Latest")}
            >
              <p className="text-white fw-bold m-0">Latest</p>
            </li>
          </ul>
        </div>
      </div>
      {status === "loading" && <div className="text-center">Loading...</div>}
      {status === "error" && (
        <div className="alert alert-danger">Error: {error}</div>
      )}
      <ul className="list-group">
        {sortedPosts(filteredUsers, selectedOption)?.map((post) => (
          <li className="list-group-item" key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
