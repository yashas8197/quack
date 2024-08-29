import { FileImage, Smile } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../utils/postSlice";
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadWidget";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState({
    firstName: "Katherine",
    lastName: "Brundage",
    avatarURL:
      "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
    username: "Katherine",
    content: "",
    mediaUrl: "",
    type: "",
  });

  const handleUpload = (url) => {
    setPostForm((prev) => ({
      ...prev,
      mediaUrl: url,
      type: url.endsWith(".mp4") ? "video" : "image",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ dataToUpload: postForm }));
    setPostForm({
      firstName: "Katherine",
      lastName: "Brundage",
      avatarURL:
        "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
      username: "Katherine",
      content: "",
      mediaUrl: "",
      type: "",
    });
  };

  return (
    <div className="p-4" style={{ border: "none" }}>
      <div className="d-flex align-items-start mb-3">
        <img
          className="rounded-circle me-3"
          src={postForm.avatarURL}
          alt="User Avatar"
          onClick={() => navigate("/profile/Katherine")}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
        <form className="flex-grow-1" onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Write something..."
            style={{
              border: "none",
              outline: "none",
              boxShadow: "none",
            }}
            value={postForm.content}
            onChange={(e) =>
              setPostForm((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>

          {postForm.mediaUrl && (
            <div className="mb-3">
              {postForm.type === "video" ? (
                <video className="w-25 rounded" controls autoPlay muted loop>
                  <source src={postForm.mediaUrl} />
                </video>
              ) : (
                <img
                  className="w-25 rounded"
                  src={postForm.mediaUrl}
                  alt="Preview"
                />
              )}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <UploadWidget onUpload={handleUpload} />
            </div>

            <button
              className="btn btn-primary rounded-pill"
              type="submit"
              disabled={!postForm.content && !postForm.mediaUrl}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
