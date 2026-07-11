import { useState } from "react";
import Container from "../../ui/Container";
import GlassPanel from "../../common/GlassPanel";
import LogoSection from "./LogoSection";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";
import MobileDrawer from "./MobileDrawer";
import ScrollProgress from "./ScrollProgress";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <Container>
          <GlassPanel
            className="flex items-center justify-between px-5 py-4"
            blur="lg"
          >
            <LogoSection />

            <NavLinks />

            <NavActions />

            <MobileMenu onClick={() => setIsOpen(true)} />
          </GlassPanel>
        </Container>
      </header>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}