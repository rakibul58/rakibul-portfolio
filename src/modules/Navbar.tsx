import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "motion/react";

const Navbar = () => {
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
        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-primary">
            About
          </a>
          <a href="#projects" className="hover:text-primary">
            Projects
          </a>
          <a href="#contact" className="hover:text-primary">
            Contact
          </a>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
