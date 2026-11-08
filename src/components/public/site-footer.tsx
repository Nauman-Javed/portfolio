import { RiHeartFill, RiArrowUpLine } from "react-icons/ri";
import { getProfile } from "@/data/queries";
import { Container } from "./ui";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="border-hairline mt-24 border-t">
      <Container className="text-fg3 flex flex-wrap items-center justify-between gap-3 py-8 text-xs">
        <p>
          © {profile?.name}. Made with{" "}
          <RiHeartFill
            size={14}
            aria-hidden
            className="inline-block align-[-2px] text-[#e5484d]"
          />
          <span className="sr-only"> love</span> in Pakistan
        </p>
        <a
          href="#top"
          className="hover:text-fg flex min-h-11 items-center transition-colors duration-150"
        >
          Back to top{" "}
          <RiArrowUpLine aria-hidden className="inline-block size-4" />
        </a>
      </Container>
    </footer>
  );
}
