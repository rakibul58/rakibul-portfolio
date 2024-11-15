import { motion } from "motion/react";
import { About, Education, GitHubStats, HeroSection, Navbar, Professional_Experience } from "./modules";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <HeroSection />
          <About />
          <Professional_Experience />
          <Education />
          <GitHubStats username="rakibul58" />
        </div>
      </motion.section>
    </div>
  );
}

export default App;
