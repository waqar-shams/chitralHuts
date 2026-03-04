"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/app/hooks/useApi";

const emptyProjectTemplate = {
  project: {
    id: "",
    name: "",
    location: "",
    phase: "",
    startDate: "",
    estimatedCompletion: "",
  },
  stats: {},
  chartData: [],
  breakdown: [],
  breakdownTotals: {},
  recentActivity: [],
  transactions: [],
  progressUpdates: [],
  milestones: [],
  documents: { legal: [], progress: [], decisions: [] },
  withdraw: {},
};

export default function AdminProjectPage() {
  const { data: projects = [], refetch: refetchProjects } = useApi({ url: "/api/projects" });
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(emptyProjectTemplate);
  const [message, setMessage] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (selectedId) {
      const proj = projects.find((p) => p.id === selectedId);
      setFormData(proj ? { ...proj } : emptyProjectTemplate);
    } else {
      setFormData(emptyProjectTemplate);
    }
  }, [selectedId, projects]);

  const updateField = (path, value) => {
    setFormData((prev) => {
      const copy = { ...prev };
      const parts = path.split(".");
      let obj = copy;
      while (parts.length > 1) {
        const key = parts.shift();
        if (!(key in obj)) obj[key] = {};
        obj = obj[key];
      }
      obj[parts[0]] = value;
      return copy;
    });
  };

  const saveProject = async () => {
    setLoadingSave(true);
    setMessage(null);
    try {
      const token = sessionStorage.getItem("accessToken");
      let res;
      if (selectedId) {
        // update existing
        res = await fetch(`/api/projects/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ fields: formData }),
        });
      } else {
        // create new
        res = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(formData),
        });
      }
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to save");
      setMessage({ type: "success", text: "Project saved" });
      setSelectedId(result.id || result._id);
      refetchProjects();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoadingSave(false);
    }
  };

  const addBreakdownRow = () => {
    setFormData((prev) => ({
      ...prev,
      breakdown: [...(prev.breakdown || []), { name: "", amount: "" }],
    }));
  };

  const removeBreakdownRow = (index) => {
    setFormData((prev) => {
      const arr = [...(prev.breakdown || [])];
      arr.splice(index, 1);
      return { ...prev, breakdown: arr };
    });
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...(prev.milestones || []), { month: "", label: "", completed: false }],
    }));
  };

  const removeMilestone = (index) => {
    setFormData((prev) => {
      const arr = [...(prev.milestones || [])];
      arr.splice(index, 1);
      return { ...prev, milestones: arr };
    });
  };

  const addProgressUpdate = () => {
    setFormData((prev) => ({
      ...prev,
      progressUpdates: [...(prev.progressUpdates || []), { date: "", description: "", progress: 0 }],
    }));
  };

  const handleSelectProject = (e) => {
    setSelectedId(e.target.value || null);
    setMessage(null);
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Projects Management</h1>

      <div className="mb-6">
        <label className="block text-sm mb-1">Choose project</label>
        <select
          className="p-2 bg-[#11161D] rounded w-full max-w-md"
          value={selectedId || ""}
          onChange={handleSelectProject}
        >
          <option value="">-- create new project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.project?.id || p.id} - {p.project?.location || p.project?.name || ""}
            </option>
          ))}
        </select>
      </div>

      {formData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Project Name</label>
              <input
                type="text"
                value={formData.project.name || ""}
                onChange={(e) => updateField("project.name", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Project Location</label>
              <input
                type="text"
                value={formData.project.location || ""}
                onChange={(e) => updateField("project.location", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Current Phase</label>
              <input
                type="text"
                value={formData.project.phase || ""}
                onChange={(e) => updateField("project.phase", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.project.startDate || ""}
                onChange={(e) => updateField("project.startDate", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Estimated Completion</label>
              <input
                type="date"
                value={formData.project.estimatedCompletion || ""}
                onChange={(e) => updateField("project.estimatedCompletion", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Total Cost</label>
              <input
                type="number"
                value={formData.project.totalCost || ""}
                onChange={(e) => updateField("project.totalCost", e.target.value)}
                className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
              />
            </div>
          </div>

          {/* breakdown */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Funds Breakdown</h2>
            {(formData.breakdown || []).map((row, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="name"
                  value={row.name}
                  onChange={(e) => {
                    const arr = [...(formData.breakdown || [])];
                    arr[idx].name = e.target.value;
                    setFormData((prev) => ({ ...prev, breakdown: arr }));
                  }}
                  className="flex-1 p-2 bg-[#0B0F14] rounded border border-gray-600"
                />
                <input
                  type="number"
                  placeholder="amount"
                  value={row.amount}
                  onChange={(e) => {
                    const arr = [...(formData.breakdown || [])];
                    arr[idx].amount = e.target.value;
                    setFormData((prev) => ({ ...prev, breakdown: arr }));
                  }}
                  className="flex-1 p-2 bg-[#0B0F14] rounded border border-gray-600"
                />
                <button type="button" onClick={() => removeBreakdownRow(idx)} className="text-red-400">
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={addBreakdownRow} className="text-emerald-400">
              + Add breakdown item
            </button>
          </div>

          {/* milestones */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Milestones</h2>
            {(formData.milestones || []).map((ms, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="label"
                  value={ms.label}
                  onChange={(e) => {
                    const arr = [...(formData.milestones || [])];
                    arr[idx].label = e.target.value;
                    setFormData((prev) => ({ ...prev, milestones: arr }));
                  }}
                  className="flex-1 p-2 bg-[#0B0F14] rounded border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="month"
                  value={ms.month}
                  onChange={(e) => {
                    const arr = [...(formData.milestones || [])];
                    arr[idx].month = e.target.value;
                    setFormData((prev) => ({ ...prev, milestones: arr }));
                  }}
                  className="flex-1 p-2 bg-[#0B0F14] rounded border border-gray-600"
                />
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={ms.completed}
                    onChange={(e) => {
                      const arr = [...(formData.milestones || [])];
                      arr[idx].completed = e.target.checked;
                      setFormData((prev) => ({ ...prev, milestones: arr }));
                    }}
                  />
                  Done
                </label>
                <button type="button" onClick={() => removeMilestone(idx)} className="text-red-400">
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={addMilestone} className="text-emerald-400">
              + Add milestone
            </button>
          </div>

          {/* progress updates */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Progress Updates</h2>
            {(formData.progressUpdates || []).map((pu, idx) => (
              <div key={idx} className="flex flex-col gap-2 mb-2">
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={pu.date}
                    onChange={(e) => {
                      const arr = [...(formData.progressUpdates || [])];
                      arr[idx].date = e.target.value;
                      setFormData((prev) => ({ ...prev, progressUpdates: arr }));
                    }}
                    className="p-2 bg-[#0B0F14] rounded border border-gray-600"
                  />
                  <input
                    type="number"
                    placeholder="progress %"
                    value={pu.progress}
                    onChange={(e) => {
                      const arr = [...(formData.progressUpdates || [])];
                      arr[idx].progress = e.target.value;
                      setFormData((prev) => ({ ...prev, progressUpdates: arr }));
                    }}
                    className="p-2 bg-[#0B0F14] rounded border border-gray-600 w-24"
                  />
                </div>
                <textarea
                  placeholder="description"
                  value={pu.description}
                  onChange={(e) => {
                    const arr = [...(formData.progressUpdates || [])];
                    arr[idx].description = e.target.value;
                    setFormData((prev) => ({ ...prev, progressUpdates: arr }));
                  }}
                  className="w-full p-2 bg-[#0B0F14] rounded border border-gray-600"
                />
              </div>
            ))}
            <button type="button" onClick={addProgressUpdate} className="text-emerald-400">
              + Add progress update
            </button>
          </div>

          {/* save button */}
          <div>
            <button
              type="button"
              onClick={saveProject}
              disabled={loadingSave}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded"
            >
              {loadingSave ? "Saving..." : selectedId ? "Update Project" : "Create Project"}
            </button>
            {message && (
              <p className={`${message.type === "error" ? "text-red-400" : "text-green-400"} mt-2`}>{message.text}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
