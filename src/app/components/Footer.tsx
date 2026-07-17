import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();
  const links = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/askhan963/", icon: <FiLinkedin /> },
    { label: "GitHub", href: "https://github.com/askhan963", icon: <FiGithub /> },
    { label: "Email", href: "mailto:awaiskhanniazi963@gmail.com", icon: <FiMail /> },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background px-4 py-10 text-card-foreground sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="corner-frame mx-auto max-w-7xl overflow-hidden p-6 backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(194,164,255,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%)]" />
        <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
              ASKHAN
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Building clean interfaces for real products.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-foreground/60">
              Portfolio of Muhammad Awais Khan, focused on modern frontend, full-stack systems, and thoughtful user experiences.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/45">
              Navigate
            </p>
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/45">
              Connect
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col justify-between gap-3 border-t border-border pt-5 text-sm uppercase tracking-[0.22em] text-foreground/45 sm:flex-row">
          <p>Built by <span className="text-primary">Awais Khan</span></p>
          <p>© {year} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
