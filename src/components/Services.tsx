import { servicesCards } from "@/constants/index";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Services = () => {
  return (
    <div className="sm:grid grid-cols-1 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {servicesCards.map((item, index) => (
        <Card key={index}>
          <div className="flex flex-col justify-between">
            <CardHeader className="my-2 flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`/assets/${item.image_url}`} alt="service image"/>
              </Avatar>
              <div>
                <CardTitle className="text-red-500 text-xl">{item.title}</CardTitle>
                <CardDescription className="text-orange-500">
                  {item.sub_title}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="min-h-[200px] text-sm text-slate-400">
              <p>{item.info}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <a href="/contact-us">
                <Button variant="secondary">Know more...</Button>
              </a>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Services;
