import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ScrollProgress } from "@/components/SiteChrome";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Experience />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
