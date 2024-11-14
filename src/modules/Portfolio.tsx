// Previous imports remain the same
import {
  Briefcase,
  GraduationCap,
  Code2,
  Target,
  Sparkles,
  Brain,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const Portfolio = () => {
  const skills = {
    frontend: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 80 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Prisma", level: 75 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 75 },
    ],
  };

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description:
        "Leading development of web applications using modern technologies. Implementing best practices and optimizing performance.",
      achievements: [
        "Reduced loading time by 40% through code optimization",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Led team of 4 developers in successful project delivery",
      ],
    },
    {
      title: "Frontend Developer",
      company: "StartUp Inc",
      period: "2021 - 2022",
      description:
        "Developed responsive web applications using React and Next.js. Collaborated with design team for optimal user experience.",
      achievements: [
        "Built 5+ major features with 98% client satisfaction",
        "Mentored 3 junior developers",
        "Improved site performance score from 65 to 95",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      period: "2018 - 2022",
      achievements: [
        "Graduated with First Class Honours",
        "Led University coding club",
        "Won 2 hackathons",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-4 mt-10">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Current Focus
                    </h3>
                    <p className="text-muted-foreground">
                      🔭 Currently refining my expertise in web technologies,
                      with a special focus on building scalable applications and
                      implementing microservices architecture.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Learning Journey
                    </h3>
                    <p className="text-muted-foreground">
                      🌱 Advancing my knowledge in:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Prisma and advanced database design</li>
                        <li>Microservices architecture</li>
                        <li>Cloud infrastructure optimization</li>
                        <li>Advanced TypeScript patterns</li>
                      </ul>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Interests
                    </h3>
                    <p className="text-muted-foreground">
                      ⚡ Passionate about:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Building performant web applications</li>
                        <li>Open source contribution</li>
                        <li>Teaching and mentoring</li>
                        <li>Problem-solving through code</li>
                      </ul>
                    </p>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Code2 className="h-5 w-5" />
                      Core Skills
                    </h3>
                    <Tabs defaultValue="frontend">
                      <TabsList>
                        <TabsTrigger value="frontend">Frontend</TabsTrigger>
                        <TabsTrigger value="backend">Backend</TabsTrigger>
                        <TabsTrigger value="tools">Tools</TabsTrigger>
                      </TabsList>
                      {Object.entries(skills).map(
                        ([category, categorySkills]) => (
                          <TabsContent key={category} value={category}>
                            <div className="space-y-4">
                              {categorySkills.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  className="space-y-2"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="flex justify-between">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}%</span>
                                  </div>
                                  <Progress value={skill.level} />
                                </motion.div>
                              ))}
                            </div>
                          </TabsContent>
                        )
                      )}
                    </Tabs>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-6">
                {experience.map((exp, index) => (
                  <AccordionItem key={index} value={`experience-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {exp.title} at {exp.company}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{exp.period}</p>
                      <p className="mt-2">{exp.description}</p>
                      <ul className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-6">
                {education.map((edu, index) => (
                  <AccordionItem key={index} value={`education-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {edu.degree} at {edu.institution}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{edu.period}</p>
                      <ul className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
};

export default Portfolio;
