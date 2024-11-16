// GitHubStats.tsx
import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  Code,
  GitFork,
  GitCommit,
  BookOpen,
  Activity,
  Github,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "motion/react";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  open_issues_count: number;
}

interface Language {
  name: string;
  percentage: number;
}

interface GitHubStats {
  repositories: number | string;
  totalStars: number | string;
  followers: number | string;
  following: number | string;
  totalForks: number | string;
  openIssues: number | string;
  latestRepos: Repository[];
  languages: Language[];
  contributions: number | string;
}

interface StatConfig {
  label: string;
  value: number | string;
  icon: React.FC<{ className?: string }>;
  loading: boolean;
}

interface GitHubStatsProps {
  username: string;
}

interface UserData {
  public_repos: number;
  followers: number;
  following: number;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ username }) => {
  const [stats, setStats] = useState<GitHubStats>({
    repositories: "...",
    totalStars: "...",
    followers: "...",
    following: "...",
    totalForks: "...",
    openIssues: "...",
    latestRepos: [],
    languages: [],
    contributions: "...",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData: UserData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        const reposData: Repository[] = await reposResponse.json();

        // Calculate total stars and forks
        const totalStars = reposData.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (acc, repo) => acc + repo.forks_count,
          0
        );

        // Get total open issues
        const openIssues = reposData.reduce(
          (acc, repo) => acc + repo.open_issues_count,
          0
        );

        // Get latest repositories
        const latestRepos = reposData
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .slice(0, 3);

        // Calculate languages
        const languagesMap: Record<string, number> = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languagesMap[repo.language] =
              (languagesMap[repo.language] || 0) + 1;
          }
        });

        const languages = Object.entries(languagesMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / reposData.length) * 100),
          }));

        setStats({
          repositories: userData.public_repos,
          totalStars,
          followers: userData.followers,
          following: userData.following,
          totalForks,
          openIssues,
          latestRepos,
          languages,
          contributions: userData.public_repos * 25, // Rough estimate
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  const mainStats: StatConfig[] = [
    {
      label: "Repositories",
      value: stats.repositories,
      icon: Code,
      loading,
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: Star,
      loading,
    },
    {
      label: "Total Forks",
      value: stats.totalForks,
      icon: GitFork,
      loading,
    },
    {
      label: "GitHub Followers",
      value: stats.followers,
      icon: Users,
      loading,
    },
  ];

  const additionalStats: StatConfig[] = [
    {
      label: "Following",
      value: stats.following,
      icon: Users,
      loading,
    },
    {
      label: "Open Issues",
      value: stats.openIssues,
      icon: GitCommit,
      loading,
    },
    {
      label: "Contributions",
      value: stats.contributions,
      icon: Activity,
      loading,
    },
    {
      label: "Languages",
      value: stats.languages.length,
      icon: BookOpen,
      loading,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly increased stagger time
        delayChildren: 0.1, // Added small initial delay
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    },
  };

  const languageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const languageItemVariants = {
    hidden: { opacity: 0, x: -10, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  // Enhanced renderStatCard function
  const renderStatCard = (stat: StatConfig) => (
    <motion.div
      key={stat.label}
      className="text-center group"
      variants={statVariants}
      whileHover={{
        scale: 1.03,
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
    >
      <div className="flex justify-center mb-2">
        <motion.div
          className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
        >
          <stat.icon className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={stat.value.toString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-primary"
        >
          {stat.loading ? (
            <div className="h-8 w-16 mx-auto bg-muted animate-pulse rounded" />
          ) : typeof stat.value === "number" ? (
            stat.value.toLocaleString()
          ) : (
            stat.value
          )}
        </motion.div>
      </AnimatePresence>
      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
    </motion.div>
  );

  return (
    <motion.div
      id="github-stats"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div variants={cardVariants}>
        <Card className="mb-8">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6,
              }}
            >
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 380],
                    transition: { duration: 0.6 },
                  }}
                >
                  <Github className="h-6 w-6" />
                </motion.div>
                Github Stats
              </CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <div className="space-y-12 py-8">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                variants={containerVariants}
              >
                {mainStats.map(renderStatCard)}
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                variants={containerVariants}
              >
                {additionalStats.map(renderStatCard)}
              </motion.div>

              {!loading && stats.languages.length > 0 && (
                <motion.div
                  className="space-y-4"
                  variants={languageContainerVariants}
                >
                  <motion.h3
                    variants={languageItemVariants}
                    className="text-xl font-semibold"
                  >
                    Top Languages
                  </motion.h3>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={languageContainerVariants}
                  >
                    {stats.languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        variants={languageItemVariants}
                        whileHover="hover"
                        className="px-3 py-1 rounded-full bg-primary/10 text-sm hover:bg-primary/20 transition-colors duration-300"
                      >
                        {lang.name} ({lang.percentage}%)
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default GitHubStats;
