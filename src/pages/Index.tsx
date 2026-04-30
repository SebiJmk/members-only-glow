import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Vibe } from "@/components/Vibe";
import { Menu } from "@/components/Menu";
import { Reserve } from "@/components/Reserve";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground pb-32 md:pb-0">
      <Navbar />
      <Hero />
      <Vibe />
      <Menu />
      <Reserve />
      <Footer />
      <BottomNav />
    </main>
  );
};

export default Index;
