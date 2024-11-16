import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function Professional_Experience() {
  const experience = [
    {
      title: "Full Stack Developer",
      company: "Experiment Labs",
      period: "Apr 2023 - November 2024",
      description:
        "Leading development of web applications using modern technologies. Implementing best practices and optimizing performance.",
      achievements: [
        "Spearheaded the development of real-time communication features utilizing Socket.io, enhancing user engagement and collaboration within the application.",
        "Engineered robust email functionalities using AWS SES (Simple Email Service), ensuring seamless and scalable communication channels for transactional and marketing purposes.",
        "Orchestrated AWS S3 (Simple Storage Service) for optimized storage solutions, streamlining file management and data accessibility while maintaining security standards.",
        "Leveraged the Zoom API to seamlessly integrate video conferencing capabilities, fostering virtual collaboration and communication among users in the application ecosystem.",
      ],
    },
    {
      title: "React Developer",
      company: "Jamrio Private LTD",
      period: "Dec 2022 - Mar 2023",
      description:
        "Developed responsive web applications using React. Collaborated with design team for optimal user experience.",
      achievements: [
        "Contributed to the development of dynamic user interfaces using React.js, enhancing the overall user experience and interface responsiveness.",
        "Collaborated with the design team to implement pixel-perfect designs and ensure seamless integration with backend systems.",
        "Optimized application performance by identifying and resolving bottlenecks through code refactoring and performance-tuning techniques.",
        "Utilized React Router for client-side routing, enabling smooth navigation and enhancing the application's usability.",
      ],
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
              <motion.div key={index} variants={itemVariants} custom={index}>
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
                      <motion.p variants={listItemVariants} className="mt-2">
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
  );
}
