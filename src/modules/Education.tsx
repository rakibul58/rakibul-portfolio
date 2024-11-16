import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "International Islamic University, Chittagong",
      period: "October 2019 - November 2024",
      result: "CGPA: 3.709 / 4.0",
    },
    {
      degree: "High School Certificate",
      institution: "Government City College, Chittagong",
      period: "2018 - 2019",
      result: "GPA: 4.42 / 5.0",
    },
    {
      degree: "Secondary School Certificate",
      institution: "Nasirabad Government High School, Chittagong",
      period: "2016 - 2017",
      result: "GPA: 5.0 / 5.0",
    },
  ];

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

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const contentItemVariants = {
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
    <motion.div
      id="education"
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
              <GraduationCap className="h-6 w-6" />
              Education
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Accordion
            defaultValue={["education-0"]}
            type="multiple"
            className="space-y-6"
          >
            {education.map((edu, index) => (
              <motion.div key={index} variants={itemVariants} custom={index}>
                <AccordionItem value={`education-${index}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AccordionTrigger className="text-xl font-semibold">
                      {edu.degree}
                    </AccordionTrigger>
                  </motion.div>
                  <AccordionContent>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={contentVariants}
                    >
                      <motion.p
                        variants={contentItemVariants}
                        className="font-semibold text-lg"
                      >
                        {edu.institution}
                      </motion.p>
                      <motion.p
                        variants={contentItemVariants}
                        className="text-muted-foreground"
                      >
                        {edu.period}
                      </motion.p>
                      <motion.p
                        variants={contentItemVariants}
                        className="hover:text-foreground transition-colors duration-200"
                      >
                        {edu.result}
                      </motion.p>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
