import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import FollowSuggestions from "./components/FollowSuggestions";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div style={{ marginLeft: "6rem" }}>
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
    </div>
  );
}

export default App;
