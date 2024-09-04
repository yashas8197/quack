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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { usersList, loading } = useSelector((state) => state.users);
  const ownerUserData = useSelector((state) => state.users.ownerUserData);

  const ownerUser =
    usersList?.find((user) => user.username === "Katherine") || [];

  // console.log(ownerUserData);

  const whoToFollow = ownerUser
    ? usersList?.filter(
        (user) =>
          user.username !== "Katherine" &&
          !ownerUser.following.some(
            (following) => following.username === user.username
          )
      )
    : [];

  const followRequest = (user) => {
    try {
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

      /* dispatch(
        updateUserFollowers({ id: user._id, dataToUpdate: ownerUserData })
      ); */

      dispatch(
        updateUserFollowers({
          id: user._id,
          dataToUpdate: {
            firstName: "Katherine",
            lastName: "Brundage",
            username: "Katherine",
            avatarURL:
              "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
          },
        })
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (whoToFollow.length === 0) {
    return;
  }

  if (loading) {
    return <p className="text-secondary">Loading suggestions...</p>;
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
            onClick={() => navigate(`/profile/${user.username}`)}
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
