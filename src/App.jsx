import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import FollowSuggestions from "./components/FollowSuggestions";

function App() {
  return (
    <div className="">
      <Header />
      <div className="d-flex">
        <div className="w-25">
          <NavMenu />
        </div>
        <Outlet />
        <div className="w-50 mx-4">
          <FollowSuggestions />
        </div>
      </div>
    </div>
  );
}

export default App;
