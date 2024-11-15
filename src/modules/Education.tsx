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
  return (
    <div id="education">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={[`education-0`]} type="multiple" className="space-y-6">
            {education.map((edu, index) => (
              <AccordionItem key={index} value={`education-${index}`}>
                <AccordionTrigger className="text-xl font-semibold">
                  {edu.degree}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-semibold text-lg">{edu.institution}</p>
                  <p className="text-muted-foreground">{edu.period}</p>
                  <p className="">{edu.result}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
