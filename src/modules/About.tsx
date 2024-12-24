import { useEffect, useState } from "react";
import axios from "axios";
import { Code2, Target, Sparkles, Brain, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AboutSkeleton from "@/components/AboutSkeleton";

interface AboutData {
  currentFocus: {
    title: string;
    description: string;
    items: string[];
  };
  learning: {
    title: string;
    description: string;
    items: string[];
  };
  interests: {
    title: string;
    description: string;
    items: string[];
  };
  [key: string]: any;
  skills: {
    frontend: Skill[];
    backend: Skill[];
    tools: Skill[];
  };
}

interface Skill {
  name: string;
  level: string;
  experience: string;
  details: string;
  projects?: string[];
  keywords: string[];
  [key: string]: any;
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    currentFocus: { title: "", description: "", items: [] },
    learning: { title: "", description: "", items: [] },
    interests: { title: "", description: "", items: [] },
    skills: { frontend: [], backend: [], tools: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/about`
        );
        // console.log({ response: response.data });
        setAboutData(response?.data?.data);
      } catch (err: any) {
        console.log({ err });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading ? (
        <AboutSkeleton />
      ) : (
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
                  {/* Current Focus Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {aboutData.currentFocus.title}
                    </h3>
                    <p className="text-muted-foreground">
                      🔭 {aboutData.currentFocus.description}
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        {aboutData.currentFocus.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </p>
                  </motion.div>

                  {/* Learning Journey Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      {aboutData.learning.title}
                    </h3>
                    <p className="text-muted-foreground">
                      🌱 {aboutData.learning.description}
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        {aboutData.learning.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </p>
                  </motion.div>

                  {/* Interests Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      {aboutData.interests.title}
                    </h3>
                    <p className="text-muted-foreground">
                      ⚡ {aboutData.interests.description}
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        {aboutData.interests.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
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
                      {Object.entries(aboutData.skills).map(
                        ([category, skills]) => (
                          <TabsContent key={category} value={category}>
                            <motion.div
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -20, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="space-y-6">
                                {skills.map((skill, index) => (
                                  <motion.div
                                    key={index}
                                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                      opacity: 1,
                                      transition: {
                                        delay: index * 0.1,
                                      },
                                    }}
                                  >
                                    <div className="flex justify-between items-center mb-2">
                                      <h4 className="font-semibold text-lg">
                                        {skill.name}
                                      </h4>
                                      <Badge
                                        variant={
                                          skill.level === "Advanced"
                                            ? "default"
                                            : skill.level === "Intermediate"
                                            ? "secondary"
                                            : "outline"
                                        }
                                      >
                                        {skill.level} • {skill.experience}
                                      </Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-2">
                                      {skill.details}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {skill.keywords.map((keyword, kidx) => (
                                        <Badge key={kidx} variant="outline">
                                          {keyword}
                                        </Badge>
                                      ))}
                                    </div>
                                    {skill.projects && (
                                      <div className="mt-2 text-sm text-muted-foreground">
                                        Projects: {skill.projects.join(", ")}
                                      </div>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          </TabsContent>
                        )
                      )}
                    </Tabs>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default About;
