import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, BookOpen } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import BlogsSkeleton from "@/components/BlogsSkeleton";

export interface IBlogSchema {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: {
    url: string;
  };
  category: string;
  tags: string[];
  status: "draft" | "published";
  createdAt: string;
}

const BLOGS_PER_PAGE = 3;

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<IBlogSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Get values from URL parameters or use defaults
  const currentPage = parseInt(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || "";

  // Fetch blogs whenever URL parameters change
  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = new URL(`${import.meta.env.VITE_BASEURL}/blogs`);

      // Add query parameters
      url.searchParams.append("page", currentPage.toString());
      url.searchParams.append("limit", BLOGS_PER_PAGE.toString());
      url.searchParams.append("status", "published");
      if (selectedCategory) {
        url.searchParams.append("category", selectedCategory);
      }

      const response = await axios.get(url.toString());
      const { blogs, totalPages } = response.data.data;

      setBlogs(blogs);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
    <>
      {loading ? (
        <BlogsSkeleton />
      ) : (
        <div id="blogs" className="container mx-auto py-8 scroll-mt-16">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                My Blogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Blog Grid */}
              {blogs.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={blogs.length ? "visible" : "hidden"}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                  {blogs.map((blog) => (
                    <motion.div
                      key={blog._id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Link to={`/blog/${blog.slug}`}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          {blog.coverImage?.url && (
                            <div className="relative">
                              <img
                                src={blog.coverImage.url}
                                alt={blog.title}
                                className="w-full aspect-video object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  Read Article
                                </span>
                              </div>
                            </div>
                          )}
                          <CardContent className="p-6">
                            <Badge variant="secondary" className="mb-2">
                              {blog.category}
                            </Badge>
                            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                              {blog.title}
                            </h2>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                {formatDate(blog.createdAt)}
                              </div>
                              <div className="flex items-center text-sm font-medium text-primary">
                                Read more
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No blogs found.
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${
                      currentPage == 1
                        ? "bg-secondary/50 cursor-not-allowed"
                        : "bg-secondary hover:bg-secondary/80"
                    } transition-colors`}
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage == 1}
                  >
                    Previous
                  </motion.button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${
                      currentPage == totalPages
                        ? "bg-secondary/50 cursor-not-allowed"
                        : "bg-secondary hover:bg-secondary/80"
                    } transition-colors`}
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage == totalPages}
                  >
                    Next
                  </motion.button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Blogs;
