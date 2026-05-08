"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStats, mockProjects, mockIssues, mockEngineers } from "@/src/lib/mock-data";
import { Building2, Activity, ShieldAlert, CheckCircle } from "lucide-react";

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

    // Check if the issue is a "demo" issue or a "mock" issue
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

    loadData(); // Refresh UI
    alert(`Assigned to ${engineer.name}`);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin System Overview</h1>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Open Issues</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{allIssues.filter(i => i.status === "Open").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Resolved</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{allIssues.filter(i => i.status === "Resolved").length}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Assign Engineers</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Assignee / Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.id}</TableCell>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell><Badge>{issue.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    {issue.status === "Open" ? (
                      <select className="border rounded p-1 text-sm" onChange={(e) => handleAssign(issue.id, e.target.value)} defaultValue="">
                        <option value="" disabled>Select Engineer</option>
                        {mockEngineers.map(eng => <option key={eng.id} value={eng.id}>{eng.name}</option>)}
                      </select>
                    ) : (
                      <span className="text-sm font-medium">{issue.assigneeName}</span>
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