import DashboardLayout from "@/components/DashboardLayout";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout role="customer" userName="Alice Smith">
      {children}
    </DashboardLayout>
  );
}
