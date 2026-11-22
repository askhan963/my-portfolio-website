import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();
  const links = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/askhan963/", icon: <FiLinkedin /> },
    { label: "GitHub", href: "https://github.com/askhan963", icon: <FiGithub /> },
    { label: "Email", href: "mailto:awaiskhanniazi963@gmail.com", icon: <FiMail /> },
  ];

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="section-shell grid gap-8 sm:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/50">
            Awais Khan
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-foreground/60">
            Full-stack engineer shipping production web products and applied-AI features.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
            Navigate
          </p>
          <nav className="flex flex-col gap-2" aria-label="Footer">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/65 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
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
                className="flex h-9 w-9 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-xs text-foreground/45 sm:flex-row">
        <p>© {year} Muhammad Awais Khan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
