// NavMenu.js
import {
  Bookmark,
  CircleUserRound,
  Compass,
  Feather,
  House,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavMenu = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <div className="p-4 mx-3">
      <div className="mb-4">
        <NavLink
          className={`d-flex gap-3 align-items-center h5 mb-5 text-decoration-none ${
            currentPath === "/" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
          to="/"
        >
          <House />
          Home
        </NavLink>
        <NavLink
          className={`d-flex gap-3 align-items-center h5 my-5 text-decoration-none ${
            currentPath === "/explore" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
          to="/explore"
        >
          <Compass />
          Explore
        </NavLink>
        <NavLink
          className={`d-flex gap-3 align-items-center h5 my-5 text-decoration-none ${
            currentPath === "/bookmark" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
          to="/bookmark"
        >
          <Bookmark />
          Bookmark
        </NavLink>
        <NavLink
          className={`d-flex gap-3 align-items-center h5 my-5 text-decoration-none ${
            currentPath === "/profile/Katherine" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
          to="/profile/Katherine"
        >
          <CircleUserRound />
          Profile
        </NavLink>
        <NavLink
          className={`d-flex gap-3 align-items-center h5 my-5 text-decoration-none ${
            currentPath === "/logout" ? "text-primary" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <LogOut />
          Logout
        </NavLink>
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
