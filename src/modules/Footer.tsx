import {
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react";
import { DiscordIcon, XIcon } from "@/assets/icons";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/rakibul58", label: "GitHub" },
    {
      icon: Linkedin,
      href: "www.linkedin.com/in/muhammed-rakibul-hasan",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:muhammed.rakbul.hasan.1@gmail.com",
      label: "Email",
    },
    { icon: XIcon, href: "https://x.com/rakibul_58", label: "X" },
    {
      icon: Facebook,
      href: "https://facebook.com/rhrahi14",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/rakibul14",
      label: "Instagram",
    },
    {
      icon: DiscordIcon,
      href: "https://instagram.com/rakibul14",
      label: "Discord",
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              A passionate full-stack developer dedicated to creating innovative
              web solutions and sharing knowledge with the developer community.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Experience
              </a>
              <a
                href="#education"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Education
              </a>
              <a
                href="#github-stats"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Github Stats
              </a>
              <a
                href="#contact-section"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>muhammed.rakibul.hasan.1@gmail.com</span>
            </div>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Rakibul Hasan. All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" />{" "}
              using <span className="text-primary">React</span> &{" "}
              <span className="text-primary">Tailwind CSS</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
