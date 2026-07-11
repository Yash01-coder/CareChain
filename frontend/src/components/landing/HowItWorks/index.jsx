import Container from "../../ui/Container";
import SectionHeading from "../../common/SectionHeading";
import StepCard from "./StepCard";
import { howItWorks } from "../../../constants/howItWorks";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-slate-50 px-4 py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Workflow"
          title="How CareChain"
          highlight="works"
          description="From wallet identity to encrypted storage and doctor access, CareChain follows a clear patient-first workflow."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}