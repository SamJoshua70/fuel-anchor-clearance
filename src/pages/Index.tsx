import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RefuelingTimeline } from "@/components/RefuelingTimeline";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wave-gradient">
      <Header />
      <main className="flex-1 container py-8 px-4">
        <RefuelingTimeline />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
