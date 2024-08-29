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
    <div>
      <div className="container" style={{ marginLeft: "5rem" }}>
        <p
          className={`d-flex gap-3 my-4 align-items-center h5 ${
            currentPath === "/" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <House />
          Home
        </p>

        <p
          className={`d-flex gap-3 my-4 align-items-center h5 ${
            currentPath === "/explore" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/explore")}
          style={{ cursor: "pointer" }}
        >
          <Compass />
          Explore
        </p>
        <p
          className={`d-flex gap-3 my-4 align-items-center h5 ${
            currentPath === "/bookmark" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/bookmark")}
          style={{ cursor: "pointer" }}
        >
          <Bookmark />
          Bookmark
        </p>
        <p
          className={`d-flex gap-3 my-4 align-items-center h5 ${
            currentPath === "/profile/Katherine" ? "text-primary" : ""
          }`}
          onClick={() => navigate("/profile/Katherine")}
          style={{ cursor: "pointer" }}
        >
          <CircleUserRound />
          Profile
        </p>
        <p
          className={`d-flex gap-3 my-4 align-items-center h5 ${
            currentPath === "/logout" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <LogOut />
          Logout
        </p>
      </div>
      <div style={{ marginLeft: "5rem" }}>
        <button className="d-flex my-4 gap-2 align-items-center btn btn-info rounded-pill text-white px-5 h5">
          <Feather />
          New Post
        </button>
      </div>
    </div>
  );
};

export default NavMenu;
