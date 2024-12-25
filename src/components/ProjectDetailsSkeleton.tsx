import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-1/4 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Media Skeleton */}
          <div className="relative mb-6">
            <Skeleton className="h-64 w-full rounded" />
          </div>

          {/* Links Skeleton */}
          <div className="flex gap-4 flex-wrap mb-6">
            <Skeleton className="h-6 w-1/6 rounded" />
            <Skeleton className="h-6 w-1/6 rounded" />
            <Skeleton className="h-6 w-1/6 rounded" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-8">
            {/* About the Project */}
            <div>
              <Skeleton className="h-5 w-1/3 rounded mb-4" />
              <Skeleton className="h-4 w-full rounded mb-2" />
              <Skeleton className="h-4 w-5/6 rounded mb-2" />
              <Skeleton className="h-4 w-4/6 rounded" />
            </div>

            {/* Technologies Used */}
            <div>
              <Skeleton className="h-5 w-1/3 rounded mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-12 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-10 rounded" />
                <Skeleton className="h-6 w-14 rounded" />
              </div>
            </div>

            {/* Documentation */}
            <div>
              <Skeleton className="h-5 w-1/3 rounded mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-4/6 rounded" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
