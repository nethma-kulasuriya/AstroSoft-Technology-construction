export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type IssuePriority = "Low" | "Medium" | "High" | "Critical";

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: string;
  projectId: string;
  projectName: string;
  reporterId: string;
  reporterName: string;
  assigneeId?: string;
  assigneeName?: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: "Active" | "Completed" | "On Hold";
  dueDate: string;
}

export const mockProjects: Project[] = [
  { id: "p1", name: "Skyline Tower", client: "Apex Dev", status: "Active", dueDate: "2027-01-15" },
  { id: "p2", name: "Riverside Complex", client: "BlueWater Real Estate", status: "Active", dueDate: "2026-11-30" },
  { id: "p3", name: "Central Station Renovation", client: "City Transit Auth", status: "On Hold", dueDate: "2026-08-01" },
];

export const mockIssues: Issue[] = [
  {
    id: "ISS-1021",
    title: "Water leak in basement level 2",
    description: "Found pooling water near the main HVAC unit in basement level 2. Likely coming from a cracked pipe in the ceiling.",
    status: "Open",
    priority: "High",
    createdAt: "2026-05-07T08:30:00Z",
    projectId: "p1",
    projectName: "Skyline Tower",
    reporterId: "u1",
    reporterName: "Alice Smith (Site Mgr)",
    location: "Basement Level 2",
  },
  {
    id: "ISS-1022",
    title: "Missing safety railings",
    description: "East wing balcony on 5th floor is missing temporary safety railings. Needs immediate attention.",
    status: "In Progress",
    priority: "Critical",
    createdAt: "2026-05-06T14:15:00Z",
    projectId: "p1",
    projectName: "Skyline Tower",
    reporterId: "u2",
    reporterName: "Bob Johnson (Inspector)",
    assigneeId: "u3",
    assigneeName: "Charlie Davis (Safety Officer)",
    location: "5th Floor East Wing",
  },
  {
    id: "ISS-1023",
    title: "Delayed material delivery: Concrete",
    description: "Supplier reported a 2-day delay for the concrete delivery scheduled for tomorrow.",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2026-05-05T09:00:00Z",
    projectId: "p2",
    projectName: "Riverside Complex",
    reporterId: "u1",
    reporterName: "Alice Smith (Site Mgr)",
    assigneeId: "u4",
    assigneeName: "Diana Evans (Logistics)",
    location: "Main Gate",
  },
  {
    id: "ISS-1024",
    title: "Electrical wiring mismatch in lobby",
    description: "The wiring installed does not match the updated blueprint from last week.",
    status: "Open",
    priority: "High",
    createdAt: "2026-05-08T10:45:00Z",
    projectId: "p2",
    projectName: "Riverside Complex",
    reporterId: "u5",
    reporterName: "Eve Foster (Electrician)",
    location: "Main Lobby",
  }
];

export const mockStats = {
  totalIssues: 124,
  openIssues: 32,
  inProgress: 18,
  resolved: 74,
  criticalIssues: 5,
};
