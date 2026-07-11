import Container from "../../ui/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 px-4 pt-32"
    >
      <HeroBackground />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <HeroContent />
            <HeroStats />
          </div>

          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}