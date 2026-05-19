const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background px-6 py-8 text-card-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-foreground/60 sm:flex-row sm:text-left">
        <p className="text-sm uppercase tracking-[0.24em]">
          Built by <span className="font-semibold text-primary">Awais Khan</span>
        </p>
        <p className="text-sm uppercase tracking-[0.24em]">
          © {new Date().getFullYear()} Awais Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
