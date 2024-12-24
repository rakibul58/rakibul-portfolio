import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Tag } from "lucide-react";
import axios from "axios";
import { IBlogSchema } from "@/modules/Blogs";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<IBlogSchema | null>(null);
  const [loading, setLoading] = useState(true);

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
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogDetails;
