import { SideNavigationBar } from "@/_components/dashboard";
import { PantryDashboard } from "@/_components/pantry";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex flex-col gap-12 p-4 pb-0">
        <h1 className="scroll-m-20 border-b pb-2 font-dmSans text-4xl font-extrabold tracking-tight lg:text-4xl">
          Pantry App
        </h1>
      </header>
      <div className="flex h-full w-full">
        <SideNavigationBar />
        <main className="flex h-screen w-full flex-1 flex-grow flex-col">
          <PantryDashboard />
        </main>
      </div>
    </main>
  );
}
