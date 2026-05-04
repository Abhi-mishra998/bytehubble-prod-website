import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import LogoRow from "./LogoRow";

export default function LogoCloud() {
  return (
    <section className="py-20 lg:py-28 bg-background" aria-label="Technology Ecosystem">
      <Container>
        <SectionHeading
          label="Integrations"
          title="Built for the Modern Data Stack"
          description="ByteHubble integrates with the technologies powering modern cloud-native databases and infrastructure."
        />
      </Container>

      {/* Full-bleed scrolling row */}
      <LogoRow />
    </section>
  );
}

