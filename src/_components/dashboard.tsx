import Link from "next/link";
import { CookingPot, Croissant } from "lucide-react";

function SideNavigationBar() {
  return (
    <aside className="hidden h-screen w-48 border-r md:flex">
      <nav className="space-y-4 border-t p-4">
        <div className="flex items-center gap-6">
          <Croissant className="h-5 w-5" />
          <Link
            href="#"
            className="flex items-center space-x-2"
            prefetch={false}
          >
            <span>My Pantry</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <CookingPot className="h-5 w-5" />
          <Link
            href="#"
            className="flex items-center space-x-2"
            prefetch={false}
          >
            <span>Recipes</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export { SideNavigationBar };
