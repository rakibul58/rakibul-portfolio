import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { handleScroll } from "@/utils";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isProjectDetails = location.pathname.startsWith("/projects/");
  const isBlogDetails = location.pathname.startsWith("/blog/");

  const handleNavScroll = (sectionId: string) => {
    handleScroll(sectionId);
    setIsOpen(false); // Close the menu after navigating
  };

  const navItems = [
    { label: "About", scrollTo: "about" },
    { label: "Projects", scrollTo: "projects" },
    { label: "Experience", scrollTo: "experience" },
    { label: "Blogs", scrollTo: "blogs" },
    { label: "Contact", scrollTo: "contact-section" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-10 shadow-lg bg-background text-foreground py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Brand Logo */}
        <motion.div
          className="font-bold text-2xl cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to={"/"}>
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Rakibul
            </span>
          </Link>
        </motion.div>

        {isProjectDetails ? (
          <ul className="flex sm:hidden items-center gap-6">
            {" "}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <ModeToggle />
          </ul>
        ) : (
          <div className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            <button className="text-3xl focus:outline-none">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        )}

        {isProjectDetails || isBlogDetails ? (
          <ul className="hidden sm:flex items-center gap-6">
            {" "}
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <ModeToggle />
          </ul>
        ) : (
          <ul className="hidden sm:flex items-center gap-6">
            {navItems.map((item) => (
              <li
                key={item.label}
                onClick={() => handleNavScroll(item.scrollTo)}
                className="hover:text-primary cursor-pointer"
              >
                {item.label}
              </li>
            ))}

            <ModeToggle />
          </ul>
        )}

        {/* Mobile Menu with Animation */}
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden absolute top-16 left-0 w-full bg-background flex flex-col items-center gap-4 p-6 shadow-lg"
          >
            {navItems.map((item) => (
              <li
                key={item.label}
                onClick={() => handleNavScroll(item.scrollTo)}
                className="hover:text-primary cursor-pointer"
              >
                {item.label}
              </li>
            ))}

            <ModeToggle />
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
