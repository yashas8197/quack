import { useNavigate } from "react-router-dom";
import { fetchUserByUsername, unFollowUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const ShowFollow = ({ user, clickedOn, notFollowBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersToDisplay =
    clickedOn === "following" ? user.following : user.followers;

  const unFollowUserHandler = (id) => {
    dispatch(unFollowUser({ userId: user._id, followId: id }));
    setTimeout(() => {
      dispatch(fetchUserByUsername("Katherine"));
    }, 500);
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {clickedOn}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {usersToDisplay?.length ? (
              usersToDisplay.map((follow) => (
                <div
                  key={follow._id}
                  className="d-flex align-items-center mb-3"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="d-flex align-items-center"
                    data-bs-dismiss="modal"
                    onClick={() => navigate(`/profile/${follow.username}`)}
                  >
                    <img
                      src={follow.avatarURL}
                      alt="User Avatar"
                      className="rounded-circle me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-bold">
                        {follow.firstName} {follow.lastName}
                      </p>
                      <p className="mb-0 text-muted">@{follow.username}</p>
                    </div>
                  </div>
                  {follow.username !== "Katherine" && (
                    <button
                      className="btn btn-outline-primary ms-auto"
                      data-bs-dismiss="modal"
                      onClick={() => unFollowUserHandler(follow._id)}
                    >
                      {notFollowBack.includes(follow.username)
                        ? "Follow"
                        : "Following"}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="h4 text-center text-secondary">
                Not following anyone!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFollow;
