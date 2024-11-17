import { motion } from "motion/react";
import {
  About,
  ContactSection,
  Education,
  Footer,
  GitHubStats,
  HeroSection,
  Professional_Experience,
  Projects,
} from "@/modules";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <HeroSection />
        <About />
        <Projects />
        <Professional_Experience />
        <Education />
        <GitHubStats username="rakibul58" />
        <ContactSection />
        <Footer />
      </div>
    </motion.section>
  );
}
