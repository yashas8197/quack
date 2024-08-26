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
  return (
    <div>
      <div className="container mx-5">
        <p
          className="d-flex gap-3 my-4 align-items-center h5"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <House />
          Home
        </p>

        <p
          className="d-flex gap-3 my-4 align-items-center h5"
          onClick={() => navigate("/explore")}
          style={{ cursor: "pointer" }}
        >
          <Compass />
          Explore
        </p>
        <p
          className="d-flex gap-3 my-4 align-items-center h5"
          onClick={() => navigate("/bookmark")}
          style={{ cursor: "pointer" }}
        >
          <Bookmark />
          Bookmark
        </p>
        <p
          className="d-flex gap-3 my-4 align-items-center h5"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <CircleUserRound />
          Profile
        </p>
        <p
          className="d-flex gap-3 my-4 align-items-center h5"
          onClick={() => navigate("/logout")}
          style={{ cursor: "pointer" }}
        >
          <LogOut />
          Logout
        </p>
      </div>
      <div className="mx-4">
        <button className="d-flex my-4 gap-2 align-items-center btn btn-info rounded-pill text-white px-5 h5">
          <Feather />
          New Post
        </button>
      </div>
    </div>
  );
};

export default NavMenu;
