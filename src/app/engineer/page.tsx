"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockIssues } from "@/src/lib/mock-data";
import { CheckCircle2, Clock } from "lucide-react";

export default function EngineerDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  const loadData = () => {
    const stored = JSON.parse(localStorage.getItem("demo_issues") || "[]");
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
    const updated = stored.map(i => i.id === id ? { ...i, status } : i);
    localStorage.setItem("demo_issues", JSON.stringify(updated));
    loadData();
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Engineer Workspace</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Assigned Jobs</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{allIssues.filter(i => i.assigneeId === "u3" && i.status !== "Resolved").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm">Resolved</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">{allIssues.filter(i => i.status === "Resolved").length}</div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allIssues.filter(i => i.assigneeId === "u3").map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">{issue.location}</div>
                  </TableCell>
                  <TableCell><Badge variant={issue.status === "Resolved" ? "secondary" : "default"}>{issue.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    {issue.status !== "Resolved" && <Button size="sm" onClick={() => updateStatus(issue.id, "Resolved")}>Mark Resolved</Button>}
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