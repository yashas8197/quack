import { useDispatch } from "react-redux";
import { updateUserProfile } from "../utils/userSlice";
import { useState } from "react";
import UploadWidget from "./UploadWidget";
import { editPostAvatar } from "../utils/postSlice";

const avatarImage = [
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601406/socialMedia/avatar/avatar-1_yg7arg.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601402/socialMedia/avatar/avatar2_wxqedh.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/v1687601397/socialMedia/avatar/avatar3_gc9xeu.png",
  "https://res.cloudinary.com/darwtgzlk/image/upload/w_400,f_auto,q_auto/v1686251367/socialMedia/profilePictures/user1_wla0x2.jpg",
];

const EditProfile = ({ user }) => {
  const [profileAvatar, setProfileAvatar] = useState(user?.avatarURL);
  const [profileBio, setProfileBio] = useState(user?.bio);
  const [profileWebsite, setProfileWebsite] = useState(user?.website);
  const dispatch = useDispatch();

  const saveProfile = () => {
    const dataToUpdate = {
      bio: profileBio,
      website: profileWebsite,
      avatarURL: profileAvatar,
    };
    dispatch(updateUserProfile({ userId: user._id, dataToUpdate }));

    const postDataToUpdate = { avatarURL: profileAvatar };
    dispatch(
      editPostAvatar({
        username: user.username,
        dataToUpdate: postDataToUpdate,
      })
    );
  };

  const handleUpload = (url) => {
    setProfileAvatar(url);
  };

  return (
    <div
      className="modal fade"
      id="editProfile"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex justify-content-between p-3">
            <div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <span className="h5 text-white fw-bold mx-3">Edit Profile</span>
            </div>
            <div>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-light fw-bold rounded-pill"
                onClick={saveProfile}
              >
                Save
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="position-relative d-inline-block">
              <img
                className="rounded-circle img-fluid "
                src={profileAvatar}
                alt="User Avatar"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                }}
              />
              <div
                className="position-absolute bottom-0 end-0"
                style={{ margin: "5px", cursor: "pointer" }}
              >
                <UploadWidget onUpload={handleUpload} />
              </div>
            </div>
            <div className="my-2">
              <p className="text-secondary m-0">
                Choose a picture from your gallary or from existing avatars
              </p>
              <div className="d-flex gap-2 mb-3">
                {avatarImage.map((avatar, i) => (
                  <img
                    key={i}
                    className="rounded-circle img-fluid "
                    src={avatar}
                    alt="User Avatar"
                    onClick={() => setProfileAvatar({ avatar })}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
              <p className="fw-bold m-0 text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-secondary">@{user.username}</p>

              <label>Bio:</label>
              <textarea
                className="form-control bg-secondary text-white"
                onChange={(e) => setProfileBio(e.target.value)}
                value={profileBio}
              ></textarea>
              <label>Website</label>
              <textarea
                type="url"
                className="form-control bg-secondary text-white"
                onChange={(e) => setProfileWebsite(e.target.value)}
                value={profileWebsite}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
