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
    </div>
  );
}
