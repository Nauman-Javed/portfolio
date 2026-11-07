import { NotFoundContent } from "@/components/public/not-found-content";
import { Container } from "@/components/public/ui";

// Shown when a public page calls notFound(), e.g. an unknown project slug.
// Renders inside the public layout, so the header and footer stay.
export default function PublicNotFound() {
  return (
    <Container className="py-32">
      <NotFoundContent />
    </Container>
  );
}
