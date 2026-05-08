"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportIssue() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "Choose Category",
    description: "",
    priority: "Medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map your UI labels to the Priority types in your mock-data.ts
    const priorityMap: Record<string, "Low" | "Medium" | "High" | "Critical"> = {
      "Low": "Low",
      "Medium": "Medium",
      "Urgent": "High" // Map 'Urgent' from UI to 'High' in your data model
    };

    const newIssue = {
      id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      description: formData.description,
      status: "Open",
      priority: priorityMap[formData.priority] || "Medium",
      createdAt: new Date().toISOString(),
      projectId: "p1",
      projectName: "Skyline Tower",
      reporterId: "u1",
      reporterName: "Alice Smith",
      location: "Main Property",
    };

    // Save to LocalStorage for cross-portal visibility
    const existing = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    localStorage.setItem("demo_issues", JSON.stringify([newIssue, ...existing]));

    // Redirect to the customer dashboard
    router.push("/customer");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-20 px-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
        <div className="mb-10">
          <p className="text-green-700 font-medium">Customer Portal</p>
          <h1 className="text-5xl font-bold mt-2">Report an Issue</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            required
            className="border border-slate-200 rounded-2xl p-4"
            placeholder="Issue Title"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <select
            className="border border-slate-200 rounded-2xl p-4"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option>Choose Category</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Structural</option>
            <option>HVAC</option>
          </select>
        </div>

        <textarea
          required
          className="w-full border border-slate-200 rounded-2xl p-4 h-40 mb-6"
          placeholder="Describe the issue..."
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {["Low", "Medium", "Urgent"].map((item) => (
            <div
              key={item}
              onClick={() => setFormData({ ...formData, priority: item })}
              className={`border rounded-2xl p-6 text-center cursor-pointer transition-all ${formData.priority === item
                  ? "border-green-700 bg-green-50 font-bold"
                  : "border-slate-200 hover:border-green-700"
                }`}
            >
              {item}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-800 text-white py-5 rounded-2xl text-lg font-semibold hover:bg-green-900 transition-colors"
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}