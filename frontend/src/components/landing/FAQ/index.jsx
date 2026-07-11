import Container from "../../ui/Container";
import SectionHeading from "../../common/SectionHeading";
import FAQItem from "./FAQItem";
import { faqs } from "../../../constants/faq";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-slate-50 px-4 py-24"
    >
      <Container size="md">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions about"
          highlight="CareChain"
          description="A quick overview of how CareChain handles healthcare records, access, blockchain, and AI features."
        />

        <div className="space-y-4">
          {faqs.map((item) => (
            <FAQItem
              key={item.question}
              item={item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}