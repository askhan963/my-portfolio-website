import { FaHeart, FaCoffee } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground border-t border-border py-8 px-6">
      <div className="text-center text-foreground/70">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span>Built with</span>
          <FaHeart className="text-primary" />
          <span>and</span>
          <FaCoffee className="text-primary" />
          <span>by</span>
          <span className="font-semibold text-primary">Awais Khan</span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Awais Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
