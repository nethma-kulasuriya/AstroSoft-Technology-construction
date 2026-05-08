"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Settings, 
  Building2,
  HardHat,
  MessageSquare
} from "lucide-react";

interface SidebarProps {
  role: "customer" | "engineer" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const links = {
    customer: [
      { name: "Dashboard", href: "/customer", icon: LayoutDashboard },
      { name: "My Issues", href: "/customer/issues", icon: Ticket },
      { name: "Submit Issue", href: "/customer/submit", icon: MessageSquare },
      { name: "Projects", href: "/customer/projects", icon: Building2 },
    ],
    engineer: [
      { name: "Dashboard", href: "/engineer", icon: LayoutDashboard },
      { name: "Assigned Issues", href: "/engineer/issues", icon: Ticket },
      { name: "Site Reports", href: "/engineer/reports", icon: HardHat },
    ],
    admin: [
      { name: "Overview", href: "/admin", icon: LayoutDashboard },
      { name: "All Issues", href: "/admin/issues", icon: Ticket },
      { name: "Projects", href: "/admin/projects", icon: Building2 },
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  };

  const navLinks = links[role];

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Building2 className="h-6 w-6 text-primary mr-2" />
        <span className="text-lg font-bold text-primary">BuildTracker</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            // Exact match for dashboard roots to avoid highlighting everything
            const isExact = link.href === `/${role}`;
            const shouldHighlight = isExact ? pathname === link.href : isActive;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-primary",
                  shouldHighlight 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
          <Settings className="h-5 w-5" />
          System Status
        </div>
      </div>
    </div>
  );
}
