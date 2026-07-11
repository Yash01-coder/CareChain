import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function NavActions() {
  return (
    <div className="hidden items-center gap-3 lg:flex">
      <Link to="/login">
        <Button variant="ghost">
          Login
        </Button>
      </Link>

      <Link to="/register">
        <Button>
          Get Started
        </Button>
      </Link>
    </div>
  );
}