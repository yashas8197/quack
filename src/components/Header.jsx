import { Bird } from "lucide-react";

const Header = () => {
  return (
    <div className="py-2 container">
      <div className=" d-flex align-items-center">
        <Bird size={30} className="me-2 text-white" />
        <h4 className="text-white">Quack</h4>
      </div>
    </div>
  );
};

export default Header;
