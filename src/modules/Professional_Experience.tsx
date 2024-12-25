import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import axios from "axios";
import ExperienceSkeleton from "@/components/ExperienceSkeleton";

interface IExperience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export default function Professional_Experience() {
  const [experience, setExperience] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const url = new URL(`${import.meta.env.VITE_BASEURL}/experiences`);

      const response = await axios.get(url.toString());
      const { experience } = response.data.data;
      console.log("Experience:", response.data.data);

      setExperience(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {" "}
      {loading ? (
        <ExperienceSkeleton />
      ) : (
        <motion.div
          id="experience"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Card className="mb-8">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6" />
                  Professional Experience
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Accordion
                defaultValue={["experience-0"]}
                type="multiple"
                className="space-y-6"
              >
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <AccordionItem value={`experience-${index}`}>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <AccordionTrigger className="text-lg font-semibold">
                          {exp.title} at {exp.company}
                        </AccordionTrigger>
                      </motion.div>
                      <AccordionContent>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={listVariants}
                        >
                          <motion.p
                            variants={listItemVariants}
                            className="text-muted-foreground"
                          >
                            {exp.period}
                          </motion.p>
                          <motion.p
                            variants={listItemVariants}
                            className="mt-2"
                          >
                            {exp.description}
                          </motion.p>
                          <motion.ul
                            variants={listVariants}
                            className="mt-2 space-y-1 list-disc pl-4 text-muted-foreground"
                          >
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                variants={listItemVariants}
                                className="hover:text-foreground transition-colors duration-200"
                              >
                                {achievement}
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
