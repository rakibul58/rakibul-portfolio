import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function BlogsSkeleton() {
  return (
    <div id="blogs" className="container mx-auto py-8 scroll-mt-16">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Blog Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="group">
                <Card className="h-full overflow-hidden">
                  <Skeleton className="w-full aspect-video object-cover rounded" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 rounded mb-2" />
                    <Skeleton className="h-6 w-full rounded mb-2" />
                    <Skeleton className="h-4 w-3/4 rounded mb-4" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-4 w-20 rounded" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center space-x-4">
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
