// Profile.js
import { CalendarDays } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../utils/userSlice";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../utils/postSlice";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username]);

  const { user, status, error } = useSelector((state) => state.users);
  const { posts } = useSelector((post) => post.posts);

  const usersPosts = posts.filter((post) => post.username === username);

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (status === "error") {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!user) return null;

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
      <div className="d-flex align-items-center mb-4">
        <img
          className="rounded-circle"
          src={user.avatarURL}
          alt="User Avatar"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div className="ms-3">
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <p>@{user.username}</p>
        </div>
        <button className="btn btn-light rounded-pill ms-auto">
          Edit Profile
        </button>
      </div>
      <div className="mb-5">
        <p>{user.bio}</p>
        <p>
          <a href={user.website} target="_blank" rel="noopener noreferrer">
            {user.website}
          </a>
        </p>
        <p className="float-end">
          <CalendarDays />
          Joined Nov 4, 2016
        </p>
        <p className="d-flex align-items-center gap-2">
          <span className="text-white fw-bold">2</span>
          <span className="text-muted">Posts</span>
          <span className="text-white fw-bold">{user.following.length}</span>
          <span className="text-muted">Following</span>
          <span className="text-white fw-bold">{user.followers.length}</span>
          <span className="text-muted">Followers</span>
        </p>
      </div>
      <div>
        {usersPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
