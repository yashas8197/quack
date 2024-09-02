import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  commentPost,
  deletePostApi,
  editedPost,
  editPostApi,
  likePost,
  setPost,
  updatePost,
} from "../utils/postSlice";
import {
  Bookmark,
  CircleCheckBig,
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import EditPost from "./EditPost";

const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMarked, setIsMarked] = useState(post?.isMarked);
  const [localComments, setLocalComments] = useState(post?.comments || []);
  const [localLiked, setLocalLiked] = useState(post?.likes);
  const [textComment, setTextComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!post) return;

  const handleComment = (postId) => {
    setShowComment((prevPostId) => (prevPostId === postId ? null : postId));
  };

  const handleBookMark = (id, post) => {
    const updatedMarked = !isMarked;
    setIsMarked(updatedMarked);
    dispatch(
      updatePost({ postId: id, updateData: { isMarked: !post.isMarked } })
    );
  };

  const handleProfileClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const copyToClipboard = async (postId) => {
    let link = window.location.origin + "/post-details/" + postId;
    await navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
  };

  const postComment = (postId) => {
    const dataToUpdate = {
      firstName: "Katherine",
      lastName: "Brundage",
      username: "Katherine",
      avatarURL:
        "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
      text: textComment,
    };

    setLocalComments((prev) => [...prev, dataToUpdate]);
    dispatch(commentPost({ postId, dataToUpdate }));
    setTextComment("");
  };

  const likedAlready = localLiked?.likedBy?.find(
    (user) => user.username === "Katherine"
  );

  const handleLike = (postId) => {
    const dataToUpdate = {
      firstName: "Katherine",
      lastName: "Brundage",
      username: "Katherine",
      avatarURL:
        "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
    };
    if (likedAlready) {
      setLocalLiked((prev) => ({
        ...prev,
        likeCount: Math.max(prev.likeCount - 1, 0),
        likedBy: prev.likedBy.filter((user) => user.username !== "Katherine"),
      }));

      dispatch(likePost({ postId, dataToUpdate: dataToUpdate }));
    } else {
      setLocalLiked((prev) => ({
        ...prev,
        likeCount: prev.likeCount + 1,
        likedBy: [...prev.likedBy, dataToUpdate],
      }));
    }

    dispatch(likePost({ postId, dataToUpdate: dataToUpdate }));
  };

  const editPost = (post) => {
    dispatch(setPost(post));
  };

  return (
    <div className="card mb-3" style={{ border: "none" }}>
      <div className="card-body" style={{ cursor: "pointer" }}>
        <div className="d-flex align-items-start gap-3">
          <img
            className="rounded-circle"
            src={post.avatarURL}
            alt="User Avatar"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            onClick={() => handleProfileClick(post.username)}
          />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <div onClick={() => handleProfileClick(post.username)}>
                <strong>
                  {post.firstName} {post.lastName}
                </strong>
                <span className="text-secondary mx-2">@{post.username}</span>
                <span className="text-secondary">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {post.username === "Katherine" && (
                <div className="btn-group">
                  <Ellipsis
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  />

                  <ul className="dropdown-menu">
                    <li
                      className="container"
                      data-bs-toggle="modal"
                      data-bs-target="#EditModal"
                      onClick={() => editPost(post)}
                    >
                      <p className="text-white fw-bold">Edit Post</p>
                    </li>
                    <li className="container">
                      <p
                        className="text-white fw-bold m-0"
                        onClick={() => dispatch(deletePostApi(post._id))}
                      >
                        Delete Post
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="mt-2 w-75">{post.content}</p>
            {post.mediaUrl && (
              <div
                className="mt-3"
                onClick={() => navigate(`/post-details/${post._id}`)}
              >
                {post?.type === "image" ? (
                  <img className="w-50 rounded" src={post.mediaUrl} />
                ) : (
                  <video className="w-50 rounded" controls autoPlay muted loop>
                    <source src={post.mediaUrl} />
                  </video>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer border-0" style={{ cursor: "pointer" }}>
        <div className="d-flex justify-content-around">
          <div
            onClick={() => handleComment(post._id)}
            className={`d-flex align-items-center gap-1 ${
              showComment ? "text-primary" : ""
            }`}
          >
            <MessageCircle />
            <span>{post.comments.length}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <Heart
              className={
                likedAlready?.username.includes("Katherine") && "text-primary"
              }
              onClick={() => handleLike(post._id)}
            />
            <span>{localLiked?.likeCount}</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <Share2
              className={showToast && "text-primary"}
              onClick={() => copyToClipboard(post._id)}
            />
          </div>
          <div className="d-flex align-items-center gap-1">
            <Bookmark
              onClick={() => handleBookMark(post._id, post)}
              className={isMarked ? "text-primary" : ""}
            />
          </div>
        </div>
      </div>

      {showComment === post._id && (
        <div className="mt-4">
          <div className="d-flex align-items-start mb-3">
            <img
              className="rounded-circle me-3"
              src="https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg"
              alt="User Avatar"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />
            <div className="flex-grow-1">
              <textarea
                className="form-control mb-2"
                rows="1"
                placeholder="Write something..."
                style={{
                  border: "none",
                  boxShadow: "none",
                  resize: "none",
                  overflow: "hidden",
                }}
                value={textComment}
                onChange={(e) => setTextComment(e.target.value)}
              ></textarea>
            </div>
            <button
              className="btn btn-primary rounded-pill"
              onClick={() => postComment(post._id)}
              disabled={textComment.length === 0}
            >
              Reply
            </button>
          </div>
          <hr />
          <ul className="list-group">
            {localComments.map((comment, i) => (
              <li className="list-group-item border-0 px-0" key={i}>
                <div className="d-flex align-items-start">
                  <img
                    className="rounded-circle me-3"
                    src={comment.avatarURL}
                    alt="User Avatar"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold">
                        {comment.firstName} {comment.lastName}
                      </span>
                      {comment.createdAt && (
                        <span className="text-secondary mx-2">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    <p className="mb-0">{comment.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer
        position="top-end"
        className="align-items-center position-fixed top-0 start-50 translate-middle-x mt-3 "
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="bg-white fw-bold text-black rounded d-flex align-items-center justify-content-center">
            <CircleCheckBig className="text-success mx-2" />
            URL copied to clipboard!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <EditPost />
    </div>
  );
};

export default PostCard;
