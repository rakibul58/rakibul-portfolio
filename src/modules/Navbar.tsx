import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "motion/react";

const Navbar = () => {
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-10 shadow-lg bg-background text-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.div
          className="font-bold text-2xl cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Rakibul
          </span>
        </motion.div>
        <ul className="flex items-center gap-6">
          <li
            onClick={() => handleScroll("about")}
            className="hover:text-primary cursor-pointer"
          >
            About
          </li>
          <li
            onClick={() => handleScroll("experience")}
            className="hover:text-primary cursor-pointer"
          >
            Experience
          </li>
          <li
            onClick={() => handleScroll("education")}
            className="hover:text-primary cursor-pointer"
          >
            Education
          </li>
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
