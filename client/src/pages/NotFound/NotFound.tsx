import { Link } from "react-router-dom";
import { Button } from "../../components/UI";

export const NotFound = () => {
  return (
    <div className="centered">
      <div>
        <h2>Page not found.</h2>
        <Link to="/">
          <Button>Go to main page.</Button>
        </Link>
      </div>
    </div>
  );
};
