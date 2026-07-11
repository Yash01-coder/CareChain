import Container from "../../ui/Container";
import SectionHeading from "../../common/SectionHeading";
import FeatureCard from "./FeatureCard";
import { features } from "../../../constants/features";

export default function Features() {
  return (
    <section
      id="features"
      className="bg-white px-4 py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Platform Features"
          title="Built for secure"
          highlight="healthcare records"
          description="CareChain combines encryption, decentralized storage, blockchain verification, and patient-first access control into one connected healthcare platform."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}