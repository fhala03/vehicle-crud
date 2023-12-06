import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="mt-32 flex items-center justify-center text-center md:mt-32">
      <div className="z-10 flex flex-col items-center justify-center gap-6">
        <h1 className="font-inter relative max-w-2xl text-5xl font-extrabold leading-[0.9] tracking-[-2.5px] sm:text-6xl md:text-7xl">
          Where dreams meet <span>the road</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Whether you're overseeing a diverse fleet or managing specific vehicle details, VehicleCRUD adapts to your unique needs.
        </p>

        <div className="flex gap-4 items-center">
          <Link target="_blank" aria-label="linkedin" rel="noreferrer" to={"https://www.linkedin.com/in/filip-halapir/"}>
            <Button size={"lg"} className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 rounded-full">
              <LinkedInLogoIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link target="_blank" aria-label="github" rel="noreferrer" to={"https://github.com/fhala03"}>
            <Button size={"lg"} className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800 rounded-full">
              <GitHubLogoIcon className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
