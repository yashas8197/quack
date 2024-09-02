// FollowSuggestions.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollowing,
  fetchUsers,
  updateUserFollowers,
  updateUserFollowing,
} from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const FollowSuggestions = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.users.usersList);

  const ownerUser = users.find((user) => user.username === "Katherine");

  const whoToFollow = users.filter(
    (user) =>
      user.username !== "Katherine" &&
      !ownerUser.following.some(
        (following) => following.username === user.username
      )
  );

  const followRequest = (user) => {
    const newFollowRequest = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      avatarURL: user.avatarURL,
    };
    dispatch(
      addFollowing({ userId: "66cf5b279f160ce5ef57dcd1", newFollowRequest })
    );
    dispatch(
      updateUserFollowing({
        id: "66cf5b279f160ce5ef57dcd1",
        dataToUpdate: newFollowRequest,
      })
    );
    const profileUser = {
      firstName: "Katherine",
      lastName: "Brundage",
      username: "Katherine",
      avatarURL:
        "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
    };
    dispatch(updateUserFollowers({ id: user._id, dataToUpdate: profileUser }));
  };

  if (whoToFollow.length === 0) {
    return;
  }

  return (
    <div
      className="p-4 rounded shadow-sm"
      style={{ backgroundColor: "#1c1c1c", cursor: "pointer" }}
    >
      <p className="h4 text-white mb-3">Who to Follow?</p>
      {whoToFollow.map((user) => (
        <div
          key={user._id}
          className="d-flex align-items-center justify-content-between my-2"
        >
          <div
            className="d-flex align-items-center"
            onClick={() => naviagate(`/profile/${user.username}`)}
          >
            <img
              className="rounded-circle"
              src={user.avatarURL}
              alt="User Avatar"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div className="ms-3">
              <p className="my-0 text-white fw-bold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-secondary mb-0">@{user.username}</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => followRequest(user)}
            >
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowSuggestions;
