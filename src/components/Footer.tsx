import gorilla from "@/assets/gorilla-logo.png";

export const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={gorilla} alt="" width={28} height={28} className="h-7 w-7 opacity-80" loading="lazy" />
        <span className="font-display tracking-[0.35em] uppercase text-sm">
          <span className="text-primary">Members</span> Only
        </span>
      </div>
      <p className="text-[11px] uppercase tracking-[0.35em] text-foreground/50">
        © 2026 Members Only · All rights reserved
      </p>
      <a
        href="https://vantagdigital.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 hover:text-primary transition-colors"
      >
        Powered by Vantag Digital
      </a>
    </div>
  </footer>
);
