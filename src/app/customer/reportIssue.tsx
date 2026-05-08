"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportIssuePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        category: "Plumbing", // Default category [cite: 71]
        description: "",
        priority: "Medium" // Default urgency [cite: 75]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newIssue = {
            id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`,
            title: formData.title,
            description: formData.description,
            status: "Open", // Initial lifecycle stage [cite: 29]
            priority: formData.priority,
            createdAt: new Date().toISOString(),
            projectId: "p1",
            projectName: "Skyline Tower",
            reporterId: "u1", // Alice Smith [cite: 61]
            reporterName: "Alice Smith",
            location: "Main Property",
        };

        const existing = JSON.parse(localStorage.getItem("demo_issues") || "[]");
        localStorage.setItem("demo_issues", JSON.stringify([newIssue, ...existing]));

        // Redirect back to the customer portal [cite: 60]
        router.push("/customer");
    };

    return (
        <div className="min-h-screen bg-slate-100 py-20 px-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
                <h1 className="text-4xl font-bold mb-8">Report an Issue</h1>

                <div className="space-y-4">
                    <input
                        required
                        className="w-full border p-4 rounded-xl"
                        placeholder="Issue Title"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <select
                        className="w-full border p-4 rounded-xl"
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Structural">Structural</option>
                    </select>

                    <textarea
                        required
                        className="w-full border p-4 rounded-xl h-32"
                        placeholder="Describe the issue..."
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    <div className="flex gap-4">
                        {["Low", "Medium", "Urgent"].map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: p })}
                                className={`flex-1 p-4 rounded-xl border ${formData.priority === p ? 'bg-green-100 border-green-600' : ''}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-green-700 text-white p-4 rounded-xl font-bold">
                        Submit Issue
                    </button>
                </div>
            </form>
        </div>
    );
}