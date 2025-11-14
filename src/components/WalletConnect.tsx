import { Button } from "@/components/ui/button";
import { Wallet, LogOut, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const WalletConnect = () => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        setIsConnected(true);
        setWalletAddress(accounts[0]);
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20">
          <CheckCircle className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-foreground">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnectWallet}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Disconnect</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      className="gap-2 bg-ocean-gradient hover:opacity-90 transition-opacity shadow-maritime"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
};

declare global {
  interface Window {
    ethereum?: any;
  }
}
