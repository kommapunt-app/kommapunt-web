import { ExampleProfilesSection } from "@/components/ExampleProfilesSection";
import { FooterStatement } from "@/components/FooterStatement";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FloatingHomeCta } from "@/components/FloatingHomeCta";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 lg:pb-8">
        <Hero />
        <ExampleProfilesSection />
        <HowItWorks />
      </main>
      <div className="pb-24 lg:pb-8">
        <FooterStatement />
      </div>
      <FloatingHomeCta />
    </>
  );
}
