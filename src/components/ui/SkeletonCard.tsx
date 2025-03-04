import { servicesCards } from "@/constants/index";
import { Skeleton } from "./skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SkeletonCard = () => {
  return (
    <>
      <Card>
        <div className="flex flex-col justify-between">
          <CardHeader className="my-2 flex-row gap-4 items-center">
            <Skeleton className="w-12 h-12 rounded-full"/>
            <Skeleton className="h-6 flex-grow"/>
          </CardHeader>
          <CardContent className="min-h-[200px] text-sm text-slate-400">
            <Skeleton className="h-4 flex-grow mt-4" />
            <Skeleton className="h-4 flex-grow mt-4" />
            <Skeleton className="h-4 w-1/2 mt-4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default SkeletonCard;
