import { SideNavigationBar } from "@/_components/dashboard";

export default function DashboardLayout({ children }: any) {
  return (
    <div>
      <header className="flex justify-between gap-12 p-4 pb-0">
        <h1 className="scroll-m-20 pb-2 font-dmSans text-4xl font-extrabold tracking-tight lg:text-4xl">
          Pantry App
        </h1>
        <a
          className="scroll-m-20 text-2xl font-semibold tracking-tight text-blue-600 hover:underline"
          href="https://github.com/baolong281/pantry"
        >
          github
        </a>
      </header>
      <div className="flex h-full w-full">
        <SideNavigationBar />
        <main className="flex h-screen w-full flex-1 flex-grow flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
