import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function ProjectSkeleton() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={"visible"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group"
        >
          <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <Skeleton className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-32 rounded mb-2" />
              <Skeleton className="h-4 w-full rounded mb-4" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, techIndex) => (
                  <Skeleton
                    key={techIndex}
                    className="h-5 w-16 rounded-full bg-primary/10"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
