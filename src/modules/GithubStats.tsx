// GitHubStats.tsx
import React, { useState, useEffect } from 'react';
import { Star, Users, Code, GitFork, GitCommit, BookOpen, Activity } from 'lucide-react';

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
    repositories: '...',
    totalStars: '...',
    followers: '...',
    following: '...',
    totalForks: '...',
    openIssues: '...',
    latestRepos: [],
    languages: [],
    contributions: '...'
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData: UserData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        const reposData: Repository[] = await reposResponse.json();

        // Calculate total stars and forks
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

        // Get total open issues
        const openIssues = reposData.reduce((acc, repo) => acc + repo.open_issues_count, 0);

        // Get latest repositories
        const latestRepos = reposData
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 3);

        // Calculate languages
        const languagesMap: Record<string, number> = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            languagesMap[repo.language] = (languagesMap[repo.language] || 0) + 1;
          }
        });

        const languages = Object.entries(languagesMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / reposData.length) * 100)
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
          contributions: userData.public_repos * 25 // Rough estimate
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
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
      loading
    },
    {
      label: "Total Stars",
      value: stats.totalStars,
      icon: Star,
      loading
    },
    {
      label: "Total Forks",
      value: stats.totalForks,
      icon: GitFork,
      loading
    },
    {
      label: "GitHub Followers",
      value: stats.followers,
      icon: Users,
      loading
    }
  ];

  const additionalStats: StatConfig[] = [
    {
      label: "Following",
      value: stats.following,
      icon: Users,
      loading
    },
    {
      label: "Open Issues",
      value: stats.openIssues,
      icon: GitCommit,
      loading
    },
    {
      label: "Contributions",
      value: stats.contributions,
      icon: Activity,
      loading
    },
    {
      label: "Languages",
      value: stats.languages.length,
      icon: BookOpen,
      loading
    }
  ];

  const renderStatCard = (stat: StatConfig) => (
    <div key={stat.label} className="text-center group">
      <div className="flex justify-center mb-2">
        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <stat.icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-primary">
        {stat.loading ? (
          <div className="h-8 w-16 mx-auto bg-muted animate-pulse rounded" />
        ) : (
          typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {stat.label}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 mt-20 pt-8 border-t">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {mainStats.map(renderStatCard)}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {additionalStats.map(renderStatCard)}
      </div>

      {/* Top Languages */}
      {!loading && stats.languages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Top Languages</h3>
          <div className="flex flex-wrap gap-2">
            {stats.languages.map((lang) => (
              <div
                key={lang.name}
                className="px-3 py-1 rounded-full bg-primary/10 text-sm"
              >
                {lang.name} ({lang.percentage}%)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;