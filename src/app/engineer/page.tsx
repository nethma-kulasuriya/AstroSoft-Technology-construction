"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockIssues } from "@/src/lib/mock-data";
import { CheckCircle2, Clock } from "lucide-react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

export default function EngineerDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  const loadData = () => {
    // 1. Get live demo data from storage [cite: 16, 220]
    const stored = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    // 2. Filter for tasks assigned to the current engineer (u3 - Charlie) or open for claiming [cite: 100, 104, 138]
    const combined = [...stored, ...mockIssues].filter(i => i.assigneeId === "u3" || i.status === "Open");
    setAllIssues(combined);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const updateStatus = (id: string, status: string) => {
    const stored = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    // Update the status in localStorage for cross-portal visibility [cite: 111, 220]
    const updated = stored.map(i => i.id === id ? { ...i, status } : i);
    localStorage.setItem("demo_issues", JSON.stringify(updated));
    loadData();
  };

  // Logic for Engineer's Personal Stats 
  const myAssignedTasks = allIssues.filter(i => i.assigneeId === "u3");
  const totalMyTasks = myAssignedTasks.length;

  const getPercentage = (value: number) => {
    if (totalMyTasks === 0) return 0;
    return ((value / totalMyTasks) * 100).toFixed(1);
  };

  // Data for Engineer-specific Wheel Charts [cite: 123, 155]
  const chartConfigs = [
    {
      name: "My Total",
      value: totalMyTasks,
      color: "#6366f1", // Indigo
      data: [{ name: "Total", value: totalMyTasks }, { name: "Other", value: 0 }]
    },
    {
      name: "My Pending",
      value: myAssignedTasks.filter(i => i.status === "Assigned" || i.status === "In Progress").length,
      color: "#fbc041ff", //yellow
      data: [
        { name: "Active", value: myAssignedTasks.filter(i => i.status === "Assigned" || i.status === "In Progress").length },
        { name: "Remaining", value: totalMyTasks - myAssignedTasks.filter(i => i.status === "Assigned" || i.status === "In Progress").length }
      ]
    },
    {
      name: "My Resolved",
      value: myAssignedTasks.filter(i => i.status === "Resolved").length,
      color: "#22c55e", // Green
      data: [
        { name: "Resolved", value: myAssignedTasks.filter(i => i.status === "Resolved").length },
        { name: "Remaining", value: totalMyTasks - myAssignedTasks.filter(i => i.status === "Resolved").length }
      ]
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Engineer Workspace (Charlie Davis)</h1>

      {/* Interactive Wheel Charts for Engineer Workload [cite: 123, 189] */}
      <div className="grid gap-4 md:grid-cols-3">
        {chartConfigs.map((config) => (
          <Card key={config.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 text-center">
              <CardTitle className="text-sm font-medium">{config.name} Jobs</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center">
              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value: number) => [`${getPercentage(value)}%`, config.name]}
                      contentStyle={{ borderRadius: '12px', border: 'none' }}
                    />
                    <Pie
                      data={config.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                      animationDuration={1500}
                    >
                      <Cell fill={config.color} />
                      <Cell fill="#f1f5f9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-2">
                <div className="text-2xl font-bold" style={{ color: config.color }}>{config.value}</div>
                <p className="text-xs text-muted-foreground">{getPercentage(config.value)}% of My Workload</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Queue & Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myAssignedTasks.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">{issue.location}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.status === "Resolved" ? "secondary" : "default"}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {issue.status !== "Resolved" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(issue.id, "Resolved")}
                        className="hover:bg-green-50 hover:text-green-700"
                      >
                        Mark Resolved
                      </Button>
                    ) : (
                      <span className="text-xs text-green-600 font-bold">Resolved</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}