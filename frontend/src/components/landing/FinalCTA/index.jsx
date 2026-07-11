import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "../../ui/Container";
import Button from "../../ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-white px-4 py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 p-10 text-center shadow-2xl md:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white">
            <ShieldCheck size={32} />
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Start securing healthcare records with CareChain.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50">
            Register as a patient or doctor and experience encrypted records,
            controlled access, and blockchain-backed healthcare workflows.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button
                size="lg"
                variant="outline"
                rightIcon={<ArrowRight size={20} />}
                className="border-white bg-white text-blue-700 hover:bg-blue-50"
              >
                Create Account
              </Button>
            </Link>

            <Link to="/login">
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/15"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}