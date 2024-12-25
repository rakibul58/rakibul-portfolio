import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Tag } from "lucide-react";
import axios from "axios";
import { IBlogSchema } from "@/modules/Blogs";

// Add these styles to your global CSS file (e.g., index.css or app.css)
const globalStyles = `
.blog-content {
  color: inherit;
  line-height: 1.75;
}

.blog-content h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
}

.blog-content h2 {
  font-size: 1.875rem;
  font-weight: 600;
  margin: 1.75rem 0 1rem;
}

.blog-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
}

.blog-content p {
  margin: 1.25rem 0;
  line-height: 1.75;
}

.blog-content ul, .blog-content ol {
  margin: 1.25rem 0;
  padding-left: 2rem;
}

.blog-content ul {
  list-style-type: disc;
}

.blog-content ol {
  list-style-type: decimal;
}

.blog-content li {
  margin: 0.5rem 0;
}

.blog-content a {
  color: hsl(var(--primary));
  text-decoration: underline;
}

.blog-content blockquote {
  border-left: 4px solid hsl(var(--primary));
  margin: 1.5rem 0;
  padding: 0.5rem 0 0.5rem 1rem;
  font-style: italic;
  background: hsl(var(--muted));
  border-radius: 0.25rem;
}

.blog-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

.blog-content pre {
  background: hsl(var(--muted));
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.blog-content code {
  background: hsl(var(--muted));
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.blog-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.blog-content th, .blog-content td {
  border: 1px solid hsl(var(--border));
  padding: 0.75rem;
  text-align: left;
}

.blog-content th {
  background: hsl(var(--muted));
  font-weight: 600;
}
`;

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<IBlogSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add styles to document head
    const styleElement = document.createElement("style");
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);

    // Cleanup function to remove styles when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/blogs/${slug}`
        );
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 mt-20"
    >
      <Card className="overflow-hidden">
        {blog.coverImage?.url && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video"
          >
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              {blog.category}
            </Badge>

            <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

            <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.createdAt)}
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex gap-2">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="hover:text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogDetails;
