import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function AboutSkeleton() {
  return (
    <div id="about">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32 rounded" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Current Focus Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 rounded mb-2" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <li key={i}>
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Journey Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 rounded mb-2" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <li key={i}>
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interests Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 rounded mb-2" />
                <Skeleton className="h-4 w-full rounded mb-2" />
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <li key={i}>
                      <Skeleton className="h-4 w-3/4 rounded" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Core Skills Skeleton */}
              <div>
                <Skeleton className="h-6 w-40 rounded mb-4" />
                <div className="flex gap-4 mb-6">
                  {["Frontend", "Backend", "Tools"].map((_, idx) => (
                    <Skeleton key={idx} className="h-8 w-20 rounded-lg" />
                  ))}
                </div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-4 w-32 rounded" />
                        <Skeleton className="h-4 w-20 rounded" />
                      </div>
                      <Skeleton className="h-4 w-full rounded mb-2" />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[...Array(3)].map((_, kidx) => (
                          <Skeleton key={kidx} className="h-6 w-12 rounded" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
