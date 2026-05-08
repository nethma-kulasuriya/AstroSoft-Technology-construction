"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockIssues } from "@/src/lib/mock-data";
import { AlertTriangle, PlusCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alice. Track your maintenance requests here.</p>
        </div>

        <Link href="/customer/report-issue">
          <Button className="gap-2 shadow-sm bg-green-700 hover:bg-green-800 text-white">
            <PlusCircle className="h-4 w-4" />
            Report New Issue
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {allIssues.filter(i => i.status === "Open" || i.status === "In Progress" || i.status === "Assigned").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {allIssues.filter(i => i.status === "Resolved").length}
            </div>
          </CardContent>
        </Card>
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