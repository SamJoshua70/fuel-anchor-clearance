import { Anchor, Ship, Waves } from "lucide-react";

const maritimeQuotes = [
  "A smooth sea never made a skilled sailor.",
  "The sea, once it casts its spell, holds one in its net of wonder forever.",
  "Navigating fuel records with blockchain precision.",
  "Trust the chain, trust the voyage.",
  "Digital ledgers for the seven seas.",
];

export const Footer = () => {
  const randomQuote = maritimeQuotes[Math.floor(Math.random() * maritimeQuotes.length)];

  return (
    <footer className="mt-auto border-t border-border/40 bg-card/95 backdrop-blur">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Anchor className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Maritime Fuel Records</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Blockchain-secured fuel delivery tracking for ships and suppliers worldwide.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-foreground">Quick Links</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Access</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">Maritime Wisdom</span>
            </div>
            <p className="text-sm italic text-muted-foreground">"{randomQuote}"</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© 2024 Encrypted Fuel Reconciliation. Powered by blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
};
