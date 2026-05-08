"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockIssues, mockEngineers } from "@/src/lib/mock-data";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  const loadData = () => {
    const storedIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    setAllIssues([...storedIssues, ...mockIssues]);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleAssign = (issueId: string, engineerId: string) => {
    const engineer = mockEngineers.find(e => e.id === engineerId);
    if (!engineer) return;

    const storedIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    const isDemoIssue = storedIssues.some(i => i.id === issueId);

    if (isDemoIssue) {
      const updatedDemo = storedIssues.map(issue => {
        if (issue.id === issueId) {
          return { ...issue, assigneeId: engineer.id, assigneeName: engineer.name, status: "In Progress" };
        }
        return issue;
      });
      localStorage.setItem("demo_issues", JSON.stringify(updatedDemo));
    }

    loadData();
    alert(`Assigned to ${engineer.name}`);
  };

  const totalCount = allIssues.length;
  const getPercentage = (value: number) => {
    if (totalCount === 0) return 0;
    return ((value / totalCount) * 100).toFixed(1);
  };

  const chartConfigs = [
    {
      name: "Total",
      value: totalCount,
      color: "#6366f1",
      data: [{ name: "Total", value: totalCount }, { name: "Other", value: 0 }]
    },
    {
      name: "Open",
      value: allIssues.filter(i => i.status === "Open").length,
      color: "#ef4444",
      data: [
        { name: "Open", value: allIssues.filter(i => i.status === "Open").length },
        { name: "Remaining", value: totalCount - allIssues.filter(i => i.status === "Open").length }
      ]
    },
    {
      name: "In Progress",
      value: allIssues.filter(i => i.status === "In Progress").length,
      color: "#fddf37ff", //yellow
      data: [
        { name: "In Progress", value: allIssues.filter(i => i.status === "In Progress").length },
        { name: "Remaining", value: totalCount - allIssues.filter(i => i.status === "In Progress").length }
      ]
    },
    {
      name: "Resolved",
      value: allIssues.filter(i => i.status === "Resolved" || i.status === "Closed").length,
      color: "#22c55e",
      data: [
        { name: "Resolved", value: allIssues.filter(i => i.status === "Resolved" || i.status === "Closed").length },
        { name: "Remaining", value: totalCount - (allIssues.filter(i => i.status === "Resolved" || i.status === "Closed").length) }
      ]
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin System Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {chartConfigs.map((config) => (
          <Card key={config.name} className="hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader className="pb-0 text-center">
              <CardTitle className="text-sm font-medium">{config.name} Issues</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center">
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(value: number) => [`${getPercentage(value)}%`, config.name]}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Pie
                      data={config.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
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
                <p className="text-xs text-muted-foreground">{getPercentage(config.value)}% of Total</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assign Engineers</CardTitle>
          <CardDescription>Allocate specialists to reported maintenance issues.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono text-xs">{issue.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">{issue.location}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.status === "Open" ? "destructive" : "default"}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {issue.status === "Open" ? (
                      <select
                        className="border rounded p-1 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => handleAssign(issue.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Select Engineer</option>
                        {mockEngineers.map(eng => (
                          <option key={eng.id} value={eng.id}>{eng.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm font-medium text-slate-600">{issue.assigneeName || "Assigned"}</span>
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