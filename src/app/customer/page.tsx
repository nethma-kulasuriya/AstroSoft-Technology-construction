import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockIssues } from "@/src/lib/mock-data";
import { MessageSquare, Clock, AlertTriangle, PlusCircle } from "lucide-react";

export default function CustomerDashboard() {
  const myIssues = mockIssues.filter(issue => issue.reporterId === "u1");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alice. Here is an overview of your reported issues.</p>
        </div>
        <Button className="gap-2 shadow-sm">
          <PlusCircle className="h-4 w-4" />
          Report New Issue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground mt-1">Issues currently open</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">1</div>
            <p className="text-xs text-muted-foreground mt-1">Being worked on by engineers</p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved (Last 30 Days)</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully closed issues</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Issues</h2>
      <div className="grid gap-4">
        {myIssues.map((issue) => (
          <Card key={issue.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">{issue.id}</span>
                  <Badge variant={issue.status === "Open" ? "destructive" : issue.status === "Resolved" ? "secondary" : "default"}>
                    {issue.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{issue.priority} Priority</Badge>
                </div>
                <h3 className="font-semibold text-lg">{issue.title}</h3>
                <p className="text-sm text-muted-foreground max-w-2xl line-clamp-2">
                  {issue.description}
                </p>
                <div className="text-xs text-muted-foreground flex gap-4 mt-2">
                  <span>Project: {issue.projectName}</span>
                  <span>Location: {issue.location}</span>
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Reported {new Date(issue.createdAt).toLocaleDateString()}
                </span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}