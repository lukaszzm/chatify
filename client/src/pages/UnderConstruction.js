import { Link } from "react-router-dom";
import Button from "../components/UI/Button";

const UnderConstruction = () => {
  return (
    <div className="centered">
      <div>
        <h2>This page is under construction. Try again Later.</h2>
        <Link to="/">
          <Button>Go to main page.</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
