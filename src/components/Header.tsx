import { Anchor } from "lucide-react";
import { WalletConnect } from "./WalletConnect";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Encrypted Fuel Reconciliation" className="h-10 w-10 animate-float" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Encrypted Fuel Reconciliation</h1>
            <p className="text-sm text-muted-foreground italic">Clear Records, Smooth Sailing.</p>
          </div>
        </div>
        <WalletConnect />
      </div>
    </header>
  );
};
