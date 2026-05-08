import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "customer" | "engineer" | "admin";
  userName: string;
}

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-slate-50/50 overflow-hidden">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader userRole={role} userName={userName} />
        <main className="flex-1 overflow-auto p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
