import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import { DiscordIcon, XIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import { handleScroll } from "@/utils";

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/rakibul58", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammed-rakibul-hasan",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:muhammed.rakbul.hasan.1@gmail.com", label: "Email" },
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
      href: "https://discord.com/invite/CsqgsVVVvh",
      label: "Discord",
    },
  ];

  const handleResumeDownload = () => {
    const resumeUrl =
      "https://drive.google.com/uc?export=download&id=1MN0Ah18IzEkXR-3xFQ-V2Qqa64aVh-Zw";
    window.open(resumeUrl, "_blank");
  };

  return (
    <section className="lg:min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative container mx-auto px-6 pt-32 md:pt-40 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Greeting */}
            <p className="text-primary font-medium">Hi there, I'm</p>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Muhammed Rakibul Hasan
            </h1>

            {/* Roles with Typewriter */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-semibold">
                <span className="text-muted-foreground">I'm a </span>
                <span className="text-primary">
                  <Typewriter
                    words={[
                      "Full Stack Developer",
                      "Tech Enthusiast",
                      "Problem Solver",
                      "Clean Code Advocate",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                I specialize in building exceptional digital experiences.
                Currently focused on creating scalable web applications and
                exploring cutting-edge technologies to craft innovative
                solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => handleScroll("github-stats")}
                size="lg"
                className="group py-4"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => handleResumeDownload()}
                size="lg"
                variant="outline"
                className="border-2 dark:border-white py-4"
              >
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center flex-wrap gap-4 pt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
