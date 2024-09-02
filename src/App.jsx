import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import FollowSuggestions from "./components/FollowSuggestions";
import { AddPostModal } from "./components/AddPost";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div style={{ marginLeft: "2rem" }}>
        <Header />
      </div>
      <div className="d-flex flex-grow-1">
        <div className="w-25">
          <NavMenu />
        </div>
        <main className="flex-grow-1 mx-1">
          <Outlet />
        </main>
        <div className="w-25 mx-4">
          <FollowSuggestions />
        </div>
      </div>
      <AddPostModal />
    </div>
  );
}

export default App;
