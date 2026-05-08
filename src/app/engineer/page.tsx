"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockIssues } from "@/src/lib/mock-data";
import { CheckCircle2, AlertTriangle, Clock } from "lucide-react";

export default function EngineerDashboard() {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    // Reload data every time to see Admin's changes
    const storedIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");

    // Filter logic: Show jobs specifically assigned to Charlie (u3) OR unassigned Open jobs
    const combined = [...storedIssues, ...mockIssues].filter(
      issue => issue.assigneeId === "u3" || issue.status === "Open"
    );

    setAllIssues(combined);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Engineer Dashboard (Charlie Davis)</h1>
        <p className="text-muted-foreground mt-1">Viewing your workload and site-wide open alerts[cite: 98].</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Assigned Jobs</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {allIssues.filter(i => i.assigneeId === "u3").length}
            </div>
          </CardContent>
        </Card>
        {/* ... keep other status cards ... */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Assignment Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Action</TableHead>
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
                    {issue.assigneeId === "u3" ? (
                      <Badge className="bg-blue-100 text-blue-700">Assigned to Me</Badge>
                    ) : (
                      <Badge variant="outline">Unassigned</Badge>
                    )}
                  </TableCell>
                  <TableCell><Badge variant="outline">{issue.priority}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant={issue.assigneeId === "u3" ? "default" : "secondary"} size="sm">
                      {issue.assigneeId === "u3" ? "Update Progress" : "Claim Task"}
                    </Button>
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