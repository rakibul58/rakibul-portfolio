import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion"; // Note: Update to "framer-motion" import
import { handleScroll } from "@/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavScroll = (sectionId: string) => {
    handleScroll(sectionId);
    setIsOpen(false); // Close the menu after navigating
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 shadow-lg bg-background text-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Brand Logo */}
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

        {/* Hamburger Icon */}
        <div className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <button className="text-3xl focus:outline-none">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-6">
          <li
            onClick={() => handleNavScroll("about")}
            className="hover:text-primary cursor-pointer"
          >
            About
          </li>
          <li
            onClick={() => handleNavScroll("experience")}
            className="hover:text-primary cursor-pointer"
          >
            Experience
          </li>
          <li
            onClick={() => handleNavScroll("education")}
            className="hover:text-primary cursor-pointer"
          >
            Education
          </li>
          <ModeToggle />
        </ul>

        {/* Mobile Menu with Animation */}
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-16 left-0 w-full bg-background flex flex-col items-center gap-4 p-6 shadow-lg"
          >
            <li
              onClick={() => handleNavScroll("about")}
              className="hover:text-primary cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => handleNavScroll("experience")}
              className="hover:text-primary cursor-pointer"
            >
              Experience
            </li>
            <li
              onClick={() => handleNavScroll("education")}
              className="hover:text-primary cursor-pointer"
            >
              Education
            </li>
            <ModeToggle />
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
