/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Layers,
  Github,
  Server,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";
import axios from "axios";
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";

interface IProject {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  slug: string;
  media: Array<{
    type: "youtube" | "video" | "image";
    url: string;
    videoId?: string;
    thumbnail?: string;
  }>;
  links: {
    live?: string;
    client?: string;
    server?: string;
    github?: string;
  };
  username?: string;
  repo?: string;
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [readme, setReadme] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match?.[1] || "";
  };

  const renderMedia = (media: IProject["media"][0]) => {
    switch (media.type) {
      case "youtube": {
        const videoId = media.videoId || getYouTubeVideoId(media.url);
        return (
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      }
      case "video":
        return (
          <video
            src={media.url}
            poster={media.thumbnail}
            controls
            className="max-h-[75vh] w-auto rounded-lg"
          />
        );
      case "image":
        return (
          <img
            src={media.url}
            alt={`Project media ${activeMediaIndex + 1}`}
            className="max-h-[75vh] w-auto rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/projects/${id}`
        );

        const data: IProject = response?.data?.data;
        console.log({ response });
        setProject(data);

        if (data.username && data.repo) {
          try {
            let readmeResponse = await fetch(
              `https://raw.githubusercontent.com/${data.username}/${data.repo}/main/README.md`
            );
            if (readmeResponse.status === 404) {
              readmeResponse = await fetch(
                `https://raw.githubusercontent.com/${data.username}/${data.repo}/main/readme.md`
              );
            }
            const text = await readmeResponse.text();
            setReadme(text);
          } catch (error) {
            console.error("Error fetching README:", error);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ProjectDetailsSkeleton />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20 text-center text-red-500">
        {error || "Project not found"}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Define a strict type for the custom components
  const markdownComponents: Partial<Components> = {
    // Headers
    h1: ({ children, ...props }) => (
      <h1
        {...props}
        className="mt-8 mb-4 pb-2 text-3xl font-bold border-b border-border"
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        {...props}
        className="mt-6 mb-4 pb-2 text-2xl font-semibold border-b border-border"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} className="mt-4 mb-3 text-xl font-semibold">
        {children}
      </h3>
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul {...props} className="my-4 list-disc list-inside space-y-2 pl-4">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="my-4 list-decimal list-inside space-y-2 pl-4">
        {children}
      </ol>
    ),

    // Code blocks
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => {
      // const match = /language-(\w+)/.exec(className || "");
      return inline ? (
        <code
          {...props}
          className="px-1.5 py-0.5 mx-0.5 bg-secondary text-sm rounded-md"
        >
          {children}
        </code>
      ) : (
        <pre
          {...props}
          className={`bg-secondary p-4 overflow-x-auto ${className} rounded-md`}
        >
          <code>{children}</code>
        </pre>
      );
    },

    // Links
    a: ({ href, children, ...props }) => (
      <a
        {...props}
        href={href || "#"}
        className="text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Paragraphs
    p: ({ children, ...props }) => (
      <p {...props} className="my-4 leading-7 text-muted-foreground">
        {children}
      </p>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        {...props}
        className="my-4 pl-4 border-l-4 border-border italic text-muted-foreground"
      >
        {children}
      </blockquote>
    ),

    // Tables
    table: ({ children, ...props }) => (
      <div className="my-4 overflow-x-auto">
        <table {...props} className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead {...props} className="bg-secondary">
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th {...props} className="border border-border px-4 py-2 text-left">
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="border border-border px-4 py-2">
        {children}
      </td>
    ),

    // Images
    img: ({ src, alt, ...props }) => (
      <img
        {...props}
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-4"
      />
    ),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 mt-20"
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {project.media.length ? (
            <motion.div variants={itemVariants} className="relative mb-6">
              <div className="relative rounded-lg bg-black flex justify-center">
                {renderMedia(project.media[activeMediaIndex])}
              </div>
              {project.media.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev === 0 ? project.media.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev === project.media.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            <></>
          )}

          {/* Project Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-wrap mb-6"
          >
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Globe className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.links.client && (
              <a
                href={project.links.client}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Github className="h-4 w-4" />
                Client Repository
              </a>
            )}
            {project.links.server && (
              <a
                href={project.links.server}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Server className="h-4 w-4" />
                Server Repository
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <Github className="h-4 w-4" />
                Github Repository
              </a>
            )}
          </motion.div>

          {/* Rest of the content */}
          <div className="space-y-8">
            {/* Project Description */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">About the Project</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {project.longDescription}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* README */}
            {readme && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h3 className="text-xl font-semibold mb-4">
                  Project Documentation
                </h3>
                <div className="markdown-content">
                  <ReactMarkdown components={markdownComponents}>
                    {readme}
                  </ReactMarkdown>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
