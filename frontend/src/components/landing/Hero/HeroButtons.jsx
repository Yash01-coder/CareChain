import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import Button from "../../ui/Button";

export default function HeroButtons() {
  return (
    <div className="mt-9 flex flex-col gap-4 sm:flex-row">
      <Link to="/register">
        <Button size="lg" rightIcon={<ArrowRight size={20} />}>
          Get Started
        </Button>
      </Link>

      <a href="#features">
        <Button
          size="lg"
          variant="outline"
          leftIcon={<PlayCircle size={20} />}
        >
          Explore Platform
        </Button>
      </a>
    </div>
  );
}