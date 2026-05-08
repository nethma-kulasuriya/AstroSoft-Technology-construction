"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStats, mockProjects, mockIssues, mockEngineers } from "@/src/lib/mock-data";
import { Building2, Activity, ShieldAlert, CheckCircle, UserPlus } from "lucide-react";

export default function AdminDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    const storedIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    setAllIssues([...storedIssues, ...mockIssues]);
  }, []);

  const handleAssign = (issueId: string, engineerId: string) => {
    const engineer = mockEngineers.find(e => e.id === engineerId);
    if (!engineer) return;

    // 1. Update the local state
    const updatedIssues = allIssues.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          assigneeId: engineer.id,
          assigneeName: engineer.name,
          status: "In Progress" // Auto-transition to In Progress on assignment 
        };
      }
      return issue;
    });

    setAllIssues(updatedIssues);

    // 2. Sync to LocalStorage (filtering only the "demo" ones)
    const demoIssuesOnly = updatedIssues.filter(issue =>
      !mockIssues.some(m => m.id === issue.id)
    );
    localStorage.setItem("demo_issues", JSON.stringify(demoIssuesOnly));

    alert(`Issue ${issueId} assigned to ${engineer.name}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* ... Header and Stat Cards remain exactly as you have them ... */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground mt-1">High-level analytics across all projects and users.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{allIssues.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open / Unassigned</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {allIssues.filter(i => i.status === "Open").length}
            </div>
          </CardContent>
        </Card>
        {/* ... remaining cards ... */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Issue Registry</CardTitle>
          <CardDescription>Assign engineers to newly submitted tasks[cite: 131].</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue & Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Assignee</TableHead>
                <TableHead className="text-right">Assign Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">{issue.location}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.status === "Open" ? "destructive" : "default"}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm italic">
                    {issue.assigneeName || "Waiting for assignment..."}
                  </TableCell>
                  <TableCell className="text-right">
                    {issue.status === "Open" ? (
                      <select
                        className="text-xs border rounded p-1"
                        onChange={(e) => handleAssign(issue.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>Choose Engineer</option>
                        {mockEngineers.map(eng => (
                          <option key={eng.id} value={eng.id}>{eng.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Assigned</span>
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