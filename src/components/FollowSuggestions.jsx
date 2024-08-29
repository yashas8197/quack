import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../utils/userSlice";

const FollowSuggestions = () => {
  const dispatch = useDispatch();
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

  return (
    <div
      className="p-4 rounded shadow-sm"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <p className="h4 text-white mb-3">Who to Follow?</p>
      {whoToFollow.map((user) => (
        <div
          key={user._id}
          className="d-flex align-items-center justify-content-between my-2"
        >
          <div className="d-flex align-items-center">
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
          <div className="mx-4">
            <button className="btn btn-outline-light btn-sm">Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowSuggestions;
