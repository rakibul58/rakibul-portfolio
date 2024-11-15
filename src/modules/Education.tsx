import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";

export default function Education() {
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
    <div id="education">
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
  );
}
