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

  const handleSubmit = () => {
    // 1. Create a new issue object matching your "Issue" interface
    const newIssue = {
      id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: formData.title,
      description: formData.description,
      status: "Open",
      priority: formData.priority,
      createdAt: new Date().toISOString(),
      projectId: "p1", // Default for demo
      projectName: "Skyline Tower", // Default for demo
      reporterId: "u1", // Matches the "Alice" filter in your dashboard
      reporterName: "Alice Smith (Site Mgr)",
      location: "Main Site",
    };

    // 2. Save to LocalStorage
    const existingIssues = JSON.parse(localStorage.getItem("demo_issues") || "[]");
    localStorage.setItem("demo_issues", JSON.stringify([newIssue, ...existingIssues]));

    // 3. Redirect back to dashboard
    router.push("/customer");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
        <div className="mb-10">
          <p className="text-green-700 font-medium">Customer Portal</p>
          <h1 className="text-5xl font-bold mt-2">Report an Issue</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            placeholder="Issue Title"
            className="border border-slate-200 rounded-2xl p-4"
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
          </select>
        </div>

        <textarea
          placeholder="Describe the issue..."
          className="w-full border border-slate-200 rounded-2xl p-4 h-40 mb-6"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>

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

        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-16 text-center mb-8">
          Upload Photos
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-800 text-white py-5 rounded-2xl text-lg font-semibold hover:bg-green-900 transition-colors"
        >
          Submit Issue
        </button>
      </div>
    </div>
  );
}