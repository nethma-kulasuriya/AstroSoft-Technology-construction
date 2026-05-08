"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockIssues } from "@/src/lib/mock-data";
import { AlertTriangle, PlusCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

export default function CustomerDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  const loadData = () => {
    const storedIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    const combined = [...storedIssues, ...mockIssues].filter(i => i.reporterId === "u1");
    setAllIssues(combined);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  // Logic for Personal Progress Stats
  const totalMyIssues = allIssues.length;
  const getPercentage = (value: number) => {
    if (totalMyIssues === 0) return 0;
    return ((value / totalMyIssues) * 100).toFixed(1);
  };

  const chartConfigs = [
    {
      name: "My Total",
      value: totalMyIssues,
      color: "#6366f1", // Indigo
      data: [{ name: "Total", value: totalMyIssues }, { name: "Other", value: 0 }]
    },
    {
      name: "Active",
      value: allIssues.filter(i => i.status === "Open" || i.status === "In Progress" || i.status === "Assigned").length,
      color: "#3b82f6", // Blue
      data: [
        { name: "Active", value: allIssues.filter(i => i.status === "Open" || i.status === "In Progress" || i.status === "Assigned").length },
        { name: "Remaining", value: totalMyIssues - allIssues.filter(i => i.status === "Open" || i.status === "In Progress" || i.status === "Assigned").length }
      ]
    },
    {
      name: "Resolved",
      value: allIssues.filter(i => i.status === "Resolved").length,
      color: "#22c55e", // Green
      data: [
        { name: "Resolved", value: allIssues.filter(i => i.status === "Resolved").length },
        { name: "Remaining", value: totalMyIssues - allIssues.filter(i => i.status === "Resolved").length }
      ]
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alice. Track your maintenance requests here.</p>
        </div>

        <Link href="/customer/report-issue">
          <Button className="gap-2 shadow-sm bg-green-700 hover:bg-green-800 text-white font-semibold">
            <PlusCircle className="h-4 w-4" />
            Report New Issue
          </Button>
        </Link>
      </div>

      {/* Interactive Personal Progress Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        {chartConfigs.map((config) => (
          <Card key={config.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-0 text-center">
              <CardTitle className="text-sm font-medium">{config.name} Requests</CardTitle>
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
                <p className="text-xs text-muted-foreground">{getPercentage(config.value)}% of Total Requests</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Recent Issues</h2>
      <div className="grid gap-4">
        {allIssues.length === 0 ? (
          <p className="text-slate-500 italic text-center py-10">No issues reported yet.</p>
        ) : (
          allIssues.map((issue) => (
            <Card key={issue.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{issue.id}</span>
                    <Badge variant={issue.status === "Resolved" ? "secondary" : "default"}>
                      {issue.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{issue.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Assigned to: {issue.assigneeName || "Pending Assignment..."}
                  </p>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}