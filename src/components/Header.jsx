import { Bird } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="py-3">
      <div className=" d-flex align-items-center">
        <Bird size={30} className="text-white" />
        <h4
          className="text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Quack
        </h4>
      </div>
    </div>
  );
};

export default Header;
