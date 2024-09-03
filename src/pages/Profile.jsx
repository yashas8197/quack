// Profile.js
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByUsername } from "../utils/userSlice";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../utils/postSlice";
import PostCard from "../components/PostCard";
import ShowFollow from "../components/ShowFollow";
import useNotFollowingBack from "../utils/useNotFollowingBack";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [clickedOn, setClickedOn] = useState("");
  const [notFollowBack, setNotFollowBack] = useState([]);

  const { posts } = useSelector((post) => post.posts);

  useEffect(() => {
    dispatch(fetchUserByUsername(username));
    dispatch(fetchPosts());
  }, [dispatch, username]);

  const { user, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (user) {
      const result = useNotFollowingBack(user);
      setNotFollowBack(result);
    }
  }, [user]);

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
          className="rounded-circle img-fluid"
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
        {user.username === "Katherine" && (
          <button
            className="btn btn-light rounded-pill ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#editProfile"
          >
            Edit Profile
          </button>
        )}
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
          <span>
            <span className="text-white fw-bold">2</span>
            <span className="text-muted">Posts</span>
          </span>
          <span
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
            onClick={() => setClickedOn("following")}
          >
            <span className="text-white fw-bold">{user.following.length}</span>
            <span className="text-muted">Following</span>
          </span>
          <span
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{ cursor: "pointer" }}
            onClick={() => setClickedOn("followers")}
          >
            <span className="text-white fw-bold">{user.followers.length}</span>
            <span className="text-muted">Followers</span>
          </span>
        </p>
      </div>
      <div>
        <ul className="list-group">
          {usersPosts.map((post) => (
            <li key={post._id} className="list-group-item">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
      <ShowFollow
        user={user}
        clickedOn={clickedOn}
        notFollowBack={notFollowBack}
      />

      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
