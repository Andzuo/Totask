import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
   return (
      <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
         <div className="md:max-w-screen-2xl gap-4 mx-auto flex items-center w-full justify-between">
            Tasks
            <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
               <Button size={"sm"} variant={"outline"} asChild>
                  <Link href={"/sing-in"}>Login</Link>
               </Button>
               <Button>
                  <Link href={"/sing-up"}>Comece grátis</Link>
               </Button>
            </div>
         </div>
      </div>
   );
};
