import { Arrow, GitHubIcon } from "@/components/ui/primitives";
import PageShell from "@/components/ui/PageShell";
import {
  cvProfile,
  cvExperience,
  cvEducation,
  cvSkills,
  cvProjects,
  cvCertifications,
} from "@/lib/cv";

export const metadata = {
  title: "CV | Victor Ouma",
  description:
    "Résumé of Victor Ouma, software developer focused on backend and full-stack development.",
};

/** PDF lives in public/cv/ — drop a file there to enable the download. */
const CV_PDF = "/cv/Victor-Ouma-CV.pdf";

/** Accent dot marker for résumé bullet points. */
function Bullet({ dark }: { dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[0.55em] h-1 w-1 flex-none rounded-full ${
        dark ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent-deep)]"
      }`}
    />
  );
}

export default function CVPage() {
  return (
    <PageShell
      label="CV"
      title={
        <>
          Curriculum <span className="serif italic font-medium">vitae.</span>
        </>
      }
      intro={cvProfile.summary}
      image="/images/about.jpg"
      imageAlt="Portrait of Victor Ouma"
    >
      {/* Contact + download banner */}
      <section
        aria-label="Contact and download"
        className="light section-light border-b border-[var(--color-paper-line)]"
      >
        <div className="wrap py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${cvProfile.email}`}
                  className="u-link font-medium text-[var(--color-paper-text)]"
                >
                  {cvProfile.email}
                </a>
              </li>
              <li>
                <a
                  href={cvProfile.phoneHref}
                  className="u-link font-medium text-[var(--color-paper-text)]"
                >
                  {cvProfile.phone}
                </a>
              </li>
              <li>
                <a
                  href={cvProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link inline-flex items-center gap-2 font-medium text-[var(--color-paper-text)]"
                >
                  <GitHubIcon size={15} />
                  {cvProfile.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={cvProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link font-medium text-[var(--color-paper-text)]"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
            <a href={CV_PDF} download className="btn btn--solid flex-none">
              Download CV
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* Profile */}
      <section
        aria-labelledby="cv-profile-heading"
        className="light section-light"
      >
        <div className="wrap py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <h2 id="cv-profile-heading" className="label">
                Profile
              </h2>
            </div>
            <p className="md:col-span-9 text-lg md:text-xl leading-relaxed text-[var(--color-paper-text)] max-w-2xl">
              {cvProfile.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        aria-labelledby="cv-experience-heading"
        className="light section-light border-t border-[var(--color-paper-line)]"
      >
        <div className="wrap py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <h2 id="cv-experience-heading" className="label">
                Experience
              </h2>
            </div>
            <ol className="md:col-span-9 space-y-12">
              {cvExperience.map((job) => (
                <li
                  key={`${job.organization}-${job.role}`}
                  className="grid md:grid-cols-12 gap-4"
                >
                  <p className="meta flex-none md:text-right md:w-32">
                    {job.period}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-semibold text-[var(--color-paper-text)]">
                      {job.role}
                    </h3>
                    <p className="text-sm font-medium text-[var(--color-accent-deep)] mt-0.5">
                      {job.organization}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-paper-mid)] max-w-xl"
                        >
                          <Bullet />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        aria-labelledby="cv-projects-heading"
        className="light section-light border-t border-[var(--color-paper-line)]"
      >
        <div className="wrap py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <h2 id="cv-projects-heading" className="label">
                Projects
              </h2>
            </div>
            <ul className="md:col-span-9 space-y-12">
              {cvProjects.map((project) => (
                <li
                  key={project.name}
                  className="border-l-2 border-[var(--color-paper-line)] pl-6"
                >
                  <h3 className="text-xl font-semibold text-[var(--color-paper-text)]">
                    {project.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-accent-deep)] mt-0.5">
                    {project.tagline}
                  </p>
                  <p className="meta mt-2">{project.stack.join(" · ")}</p>
                  <ul className="mt-3 space-y-2">
                    {project.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-paper-mid)] max-w-xl"
                      >
                        <Bullet />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        aria-labelledby="cv-education-heading"
        className="light section-light border-t border-[var(--color-paper-line)]"
      >
        <div className="wrap py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <h2 id="cv-education-heading" className="label">
                Education
              </h2>
            </div>
            <ol className="md:col-span-9 space-y-10">
              {cvEducation.map((edu) => (
                <li key={edu.qualification}>
                  <h3 className="text-lg font-semibold text-[var(--color-paper-text)]">
                    {edu.qualification}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-accent-deep)] mt-0.5">
                    {edu.institution} · {edu.period}
                  </p>
                  {edu.detail && (
                    <p className="text-[15px] leading-relaxed text-[var(--color-paper-mid)] mt-2 max-w-xl">
                      {edu.detail}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section
        aria-labelledby="cv-skills-heading"
        className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
      >
        <div className="wrap py-16 md:py-20">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <h2 id="cv-skills-heading" className="label">
                Skills
              </h2>
            </div>
            <div className="md:col-span-9 grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {cvSkills.map((group) => (
                <div key={group.group}>
                  <h3 className="meta mb-4">{group.group}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="font-mono text-[11px] tracking-[0.1em] px-3 py-1.5 border border-[var(--color-ink-hair)] text-[var(--color-ink-mid)]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      {cvCertifications.length > 0 && (
        <section
          aria-labelledby="cv-certifications-heading"
          className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
        >
          <div className="wrap py-16 md:py-20">
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <h2 id="cv-certifications-heading" className="label">
                  Certifications
                </h2>
              </div>
              <ul className="md:col-span-9 space-y-5">
                {cvCertifications.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                  >
                    <h3 className="text-[15px] font-semibold text-[var(--color-ink-hi)]">
                      {cert.name}
                    </h3>
                    <p className="meta">
                      {cert.issuer} · {cert.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section
        aria-label="Contact call to action"
        className="light section-light border-t border-[var(--color-paper-line)]"
      >
        <div className="wrap py-20 md:py-24 text-center">
          <h2 className="display-lg text-[var(--color-paper-text)] mb-6">
            Let&apos;s <span className="serif italic font-medium">talk.</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--color-paper-mid)] max-w-md mx-auto mb-10">
            Open to projects, collaborations and conversations about technology.
          </p>
          <a href={`mailto:${cvProfile.email}`} className="btn btn--solid">
            Get in touch
            <Arrow />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
