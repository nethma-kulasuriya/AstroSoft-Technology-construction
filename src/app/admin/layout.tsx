import DashboardLayout from "@/components/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="admin" userName="System Administrator">
      {children}
    </DashboardLayout>
  );
}
