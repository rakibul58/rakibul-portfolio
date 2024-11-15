import { ArrowRight, Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import GitHubStats from "./GithubStats";
import { DiscordIcon, XIcon } from "@/assets/icons";

const HeroSection = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
    { icon: XIcon , href: "#", label: "X" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: DiscordIcon, href: "#", label: "Discord" },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-background/95 mb-10">
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
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <GitHubStats username="rakibul58" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
