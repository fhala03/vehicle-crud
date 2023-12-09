import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all bg-background`)}>
      <div className="flex h-14 items-center justify-between py-6">
        <div className="flex items-center gap-8">
          <Link to={"/"} className="items-center flex gap-1">
            <h1 className=" text-2xl font-bold tracking-tighter">VehicleCRUD</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to={"/vehicle-makes"}>
            <Button className="shadow-none" variant={"secondary"}>
              Makes
            </Button>
          </Link>
          <Link to={"/vehicle-models"}>
            <Button className="shadow-none">Models</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
