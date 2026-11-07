import type { Education, Profile } from "@/data/types";
import { Section } from "./section";

export function AboutSection({
  profile,
  education,
}: {
  profile: Profile;
  education: Education[];
}) {
  return (
    <Section
      id="about"
      label="01 — About"
      title="Designing for people, building with care."
    >
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <p className="text-muted-foreground text-lg leading-relaxed sm:text-xl">
          {profile.about}
        </p>
        <div>
          <h3 className="mb-4 font-mono text-xs tracking-widest uppercase">
            Education
          </h3>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.id} className="border-brand border-l-2 pl-4">
                <p className="font-medium">{e.degree}</p>
                <p className="text-muted-foreground text-sm">{e.institution}</p>
                <p className="text-muted-foreground mt-1 font-mono text-xs">
                  {e.startYear} – {e.endYear ?? "Present"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
