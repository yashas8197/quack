// NavMenu.js
import {
  Bookmark,
  CircleUserRound,
  Compass,
  Feather,
  House,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="p-4">
      <div className="mb-4">
        <p
          className={`d-flex gap-3 align-items-center h5 mb-5 ${
            currentPath === "/" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <House />
          Home
        </p>
        <p
          className={`d-flex gap-3 align-items-center h5 my-5 ${
            currentPath === "/explore" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/explore")}
          style={{ cursor: "pointer" }}
        >
          <Compass />
          Explore
        </p>
        <p
          className={`d-flex gap-3 align-items-center h5 my-5 ${
            currentPath === "/bookmark" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/bookmark")}
          style={{ cursor: "pointer" }}
        >
          <Bookmark />
          Bookmark
        </p>
        <p
          className={`d-flex gap-3 align-items-center h5 my-5 ${
            currentPath === "/profile/Katherine" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/profile/Katherine")}
          style={{ cursor: "pointer" }}
        >
          <CircleUserRound />
          Profile
        </p>
        <p
          className={`d-flex gap-3 align-items-center h5 my-5 ${
            currentPath === "/logout" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <LogOut />
          Logout
        </p>
      </div>
      <button
        type="button"
        className="d-flex gap-2 align-items-center btn btn-info rounded-pill text-white px-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        <Feather />
        New Post
      </button>
    </div>
  );
};

export default NavMenu;
