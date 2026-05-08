import DashboardLayout from "@/components/DashboardLayout";

export default function EngineerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="engineer" userName="Charlie Davis">
      {children}
    </DashboardLayout>
  );
}
