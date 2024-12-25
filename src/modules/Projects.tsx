import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ProjectSkeleton from "@/components/ProjectSkeleton";

interface IProject {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  slug: string;
  links: {
    live?: string;
    client?: string;
    server?: string;
  };
}

interface ProjectsResponse {
  projects: IProject[];
  totalPages: number;
  currentPage: number;
}

const categories = ["Frontend", "Backend", "Full Stack"];
const PROJECTS_PER_PAGE = 6;

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [projectsData, setProjectsData] = useState<ProjectsResponse>({
    projects: [],
    totalPages: 1,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (page: number, category: string) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: PROJECTS_PER_PAGE.toString(),
        category,
        sort: "-createdAt",
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/projects?${queryParams}`
      );

      setProjectsData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1, selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const section = document.getElementById("projects");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchProjects(newPage, selectedCategory);
  };

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
    <div id="projects" className="scroll-mt-16">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            My Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                } transition-colors`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center text-red-500 mb-6">{error}</div>
          )}

          {/* Loading State */}
          {isLoading && <ProjectSkeleton />}

          {/* Projects Grid */}
          {!isLoading && projectsData.projects.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
              >
                {projectsData.projects.map((project) => (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/projects/${project._id}`}>
                      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-video object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white font-medium">
                              View Details
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(projectsData.currentPage - 1)}
                  disabled={projectsData.currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {projectsData.currentPage} of {projectsData.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(projectsData.currentPage + 1)}
                  disabled={
                    projectsData.currentPage === projectsData.totalPages
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            !isLoading && (
              <p className="text-center text-muted-foreground">
                No projects found in this category.
              </p>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
