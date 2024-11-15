import {
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

export default function About() {
  const skills = {
    frontend: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Redux", level: 80 },
      { name: "TanStack Query", level: 80 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Mongoose", level: 75 },
      { name: "Prisma", level: 75 },
      { name: "PostgreSQL", level: 70 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "AWS", level: 65 },
    ],
  };

  return (
    <div id="about">
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
                  🔭 Currently refining my expertise in web technologies, with a
                  special focus on building scalable applications and
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
                    <li>Exploring new web technologies</li>
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
                  <TabsList className="mb-6">
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>
                  {Object.entries(skills).map(([category, categorySkills]) => (
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
                  ))}
                </Tabs>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
