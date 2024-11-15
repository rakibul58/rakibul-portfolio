import { Briefcase } from "lucide-react";
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
      title: "Senior Full Stack Developer",
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

  return (
    <div id="experience">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Professional Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={[`experience-0`]} type="multiple" className="space-y-6">
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
    </div>
  );
}
