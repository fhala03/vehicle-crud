import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="md:py-32 py-12">
      <div className="flex lg:flex-row flex-col lg:items-center">
        <div className="w-full max-w-xl mx-auto lg:order-1 lg:w-1/2">
          <h1 className="text-4xl font-bold md:text-6xl xl:text-7xl">Where dreams meet the road</h1>
          <p className="mt-6 text-muted-foreground">
            Whether you're overseeing a diverse fleet or managing specific vehicle details, VehicleCRUD adapts to your unique
            needs.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Link target="_blank" aria-label="linkedin" rel="noreferrer" to={"https://www.linkedin.com/in/filip-halapir/"}>
              <Button>LinkedIn</Button>
            </Link>
            <Link target="_blank" aria-label="github" rel="noreferrer" to={"https://github.com/fhala03"}>
              <Button variant={"secondary"}>Github</Button>
            </Link>
          </div>
        </div>
        <div className="w-full h-64 lg:mt-0 mt-10 lg:order-2 lg:w-1/2 lg:h-auto">
          <img
            className="h-auto w-full rounded-md object-cover max-w-lg mx-auto"
            src="/car.svg"
            alt="Illustration"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
