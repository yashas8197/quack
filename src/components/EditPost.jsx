import { useDispatch, useSelector } from "react-redux";
import UploadWidget from "./UploadWidget";
import { useEffect, useState } from "react";
import { editedPost, editPostApi, setPost } from "../utils/postSlice";

const EditPost = () => {
  const { editPost, status } = useSelector((state) => state.posts);
  const [updatedContent, setUpdatedContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editPost) {
      setUpdatedContent(editPost.content || "");
      setMediaUrl(editPost.mediaUrl || "");
      setType(editPost?.mediaUrl?.endsWith(".mp4") ? "video" : "image" || "");
    }
  }, [editPost]);

  if (status === "loading" || !editPost) return;
  const handleUpload = (url) => {
    setMediaUrl(url);
    setType(url?.endsWith(".mp4") ? "video" : "image" || "");
  };

  const postEditHandle = (e) => {
    e.preventDefault();
    const dataToUpdate = {
      mediaUrl: mediaUrl,
      type: type,
      content: updatedContent,
    };
    dispatch(editPostApi({ id: editPost._id, dataToUpdate: dataToUpdate }));
    dispatch(setPost({}));
    setUpdatedContent("");
    setMediaUrl("");
  };

  return (
    <div
      className="modal fade"
      id="EditModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div>
            <button
              type="button"
              className="btn-close float-end"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3 d-flex">
                <img
                  className="rounded-circle me-3"
                  alt="User Avatar"
                  src={editPost.avatarURL}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
                <textarea
                  rows="3"
                  className="form-control"
                  id="message-text"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                ></textarea>
              </div>

              <UploadWidget onUpload={handleUpload} />
            </form>

            {mediaUrl && (
              <div className="mb-3">
                {type === "video" ? (
                  <video className="w-50 rounded" controls autoPlay muted loop>
                    <source src={mediaUrl} />
                  </video>
                ) : (
                  <img className="w-50 rounded" src={mediaUrl} alt="Preview" />
                )}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              data-bs-dismiss="modal"
              className="btn btn-primary rounded-pill"
              onClick={postEditHandle}
            >
              update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
