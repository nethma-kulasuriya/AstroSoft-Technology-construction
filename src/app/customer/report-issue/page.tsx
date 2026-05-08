"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReportIssueForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        category: "Plumbing",
        location: "Kitchen",
        description: "",
        priority: "Medium"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newIssue = {
            id: `ISS-${Math.floor(1000 + Math.random() * 9000)}`,
            title: formData.title,
            description: formData.description,
            status: "Open", // Stage 1: Submitted 
            priority: formData.priority === "Urgent" ? "High" : formData.priority,
            createdAt: new Date().toISOString(),
            projectId: "p1",
            projectName: "Skyline Tower",
            reporterId: "u1", // Alice Smith (Matches Dashboard Filter)
            reporterName: "Alice Smith",
            location: formData.location,
        };

        // Save to shared storage for Admin/Engineer visibility
        const existing = JSON.parse(localStorage.getItem("demo_issues") || "[]");
        localStorage.setItem("demo_issues", JSON.stringify([newIssue, ...existing]));

        // Redirect to show the new issue on the dashboard
        router.push("/customer");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <Card className="max-w-2xl mx-auto shadow-lg border-none rounded-3xl">
                <CardContent className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Report Maintenance Issue</h1>
                        <p className="text-slate-500 mt-2">Provide details below to notify the Chandana Construction team.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Issue Title</label>
                            <input
                                required
                                className="w-full p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-green-600 outline-none"
                                placeholder="e.g., Water leak in ceiling"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Category</label>
                                <select
                                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>Structural</option>
                                    <option>HVAC</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Location</label>
                                <input
                                    className="w-full p-4 rounded-2xl border border-slate-200 outline-none"
                                    placeholder="e.g., Bedroom 2"
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Description</label>
                            <textarea
                                required
                                className="w-full p-4 rounded-2xl border border-slate-200 h-32 outline-none"
                                placeholder="Describe the issue in detail..."
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Urgency Level</label>
                            <div className="flex gap-3">
                                {["Low", "Medium", "Urgent"].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: p })}
                                        className={`flex-1 py-3 rounded-xl border transition-all ${formData.priority === p
                                                ? "bg-green-700 text-white border-green-700 font-bold"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-green-700"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full py-7 bg-green-800 hover:bg-green-900 text-white rounded-2xl text-lg font-bold">
                            Submit Maintenance Request
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}