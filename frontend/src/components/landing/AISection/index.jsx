import Container from "../../ui/Container";
import SectionHeading from "../../common/SectionHeading";
import AIFeature from "./AIFeature";
import AIChatPreview from "./AIChatPreview";
import { aiFeatures } from "../../../constants/aiFeatures";

export default function AISection() {
  return (
    <section
      id="ai"
      className="bg-white px-4 py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="AI Layer"
          title="Smarter healthcare"
          highlight="record insights"
          description="CareChain can grow beyond storage into an intelligent healthcare assistant that helps patients and doctors understand records faster."
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-5">
            {aiFeatures.map((item, index) => (
              <AIFeature
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>

          <AIChatPreview />
        </div>
      </Container>
    </section>
  );
}