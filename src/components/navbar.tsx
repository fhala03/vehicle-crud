import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "@/utils/routes";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all bg-background`)}>
      <div className="flex h-14 items-center justify-between py-6">
        <div className="flex items-center gap-8">
          <Link to={"/"} className="items-center flex gap-1">
            <h1 className="text-2xl font-bold tracking-tighter">VehicleCRUD</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {Routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex w-full cursor-pointer text-sm font-medium rounded-md px-4 py-2 transition-all",
                location.pathname === route.href && "underline-offset-4 underline"
              )}
            >
              <div className="flex flex-1 items-center">{route.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
