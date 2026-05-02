import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Vibe } from "@/components/Vibe";
import { Menu } from "@/components/Menu";
import { ReserveCTA } from "@/components/ReserveCTA";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground pb-safe-nav">
      <Navbar />
      <Hero />
      <Vibe />
      <Menu />
      <ReserveCTA />
      <Footer />
      <BottomNav />
    </main>
  );
};

export default Index;
