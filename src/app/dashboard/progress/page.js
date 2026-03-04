"use client";

import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import ProgressCard from "@/app/components/ProgressCard";
import { TrendingUp, Download } from "lucide-react";
import { useApi } from "@/app/hooks/useApi";

export default function ProgressPage() {
  const { data: projectData } = useApi({ url: "/api/project" });

  const defaultProgressUpdates = [
    {
      id: 1,
      phase: "Phase 2: Structural Development",
      title: "Foundation Pouring - Block C",
      status: "In Progress",
      date: "Started 2 days ago",
      description: "Concrete pouring for the main foundation of Block C is currently underway. Weather conditions are favorable.",
      images: [
        "/progress-1.jpg",
        "/progress-2.jpg",
        "/progress-2.jpg",
      ],
      progress: 60,
    },
    {
      id: 2,
      phase: "Phase 1: Site Preparation",
      title: "Excavation Complete",
      status: "Completed",
      date: "Oct 28, 2025",
      description: "Site excavation for all three blocks completed successfully. Soil testing approved.",
      progress: 100,
    },
    {
      id: 3,
      phase: "Phase 1: Site Preparation",
      title: "Site Clearance & Fencing",
      status: "Completed",
      date: "Oct 15, 2025",
      description: "Initial site preparation, debris removal, and security fencing installation.",
      progress: 100,
    },
  ];

  const defaultMilestones = [
    { month: "Jan", label: "Project Kickoff", completed: true },
    { month: "Feb", label: "Site Prep", completed: true },
    { month: "Mar", label: "Foundation", completed: true },
    { month: "Apr", label: "Structural", completed: false },
    { month: "Jun", label: "Finishing", completed: false },
    { month: "Dec", label: "Completion", completed: false },
  ];

  const progressUpdates = projectData?.progressUpdates || defaultProgressUpdates;
  const milestones = projectData?.milestones || defaultMilestones;

  const getStatusIcon = (status) => {
    if (status === "Completed") return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (status === "In Progress") return <Clock className="w-5 h-5 text-blue-400" />;
    return <AlertCircle className="w-5 h-5 text-yellow-400" />;
  };

  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-emerald-500/20 text-emerald-400";
    if (status === "In Progress") return "bg-blue-500/20 text-blue-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="w-full p-6 mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Project Progress</h1>
          <p className=" text-sm font-normal text-[var(--color-gray-50)] mb-2">Real-time updates from the site</p>
        </div>

        <div>
                         <button className="flex px-4 py-1 text-sm font-medium text-white   hover:text-white transition cursor-pointer border border-[#1A212B] rounded-md">
                          <span className="mt-1">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1298)">
<path d="M7.875 0.875C7.875 0.391016 7.48398 0 7 0C6.51602 0 6.125 0.391016 6.125 0.875V7.51133L4.11797 5.5043C3.77617 5.1625 3.22109 5.1625 2.8793 5.5043C2.5375 5.84609 2.5375 6.40117 2.8793 6.74297L6.3793 10.243C6.72109 10.5848 7.27617 10.5848 7.61797 10.243L11.118 6.74297C11.4598 6.40117 11.4598 5.84609 11.118 5.5043C10.7762 5.1625 10.2211 5.1625 9.8793 5.5043L7.875 7.51133V0.875ZM1.75 9.625C0.784766 9.625 0 10.4098 0 11.375V12.25C0 13.2152 0.784766 14 1.75 14H12.25C13.2152 14 14 13.2152 14 12.25V11.375C14 10.4098 13.2152 9.625 12.25 9.625H9.47461L8.23594 10.8637C7.55234 11.5473 6.44492 11.5473 5.76133 10.8637L4.52539 9.625H1.75ZM11.8125 11.1562C11.9865 11.1562 12.1535 11.2254 12.2765 11.3485C12.3996 11.4715 12.4688 11.6385 12.4688 11.8125C12.4688 11.9865 12.3996 12.1535 12.2765 12.2765C12.1535 12.3996 11.9865 12.4688 11.8125 12.4688C11.6385 12.4688 11.4715 12.3996 11.3485 12.2765C11.2254 12.1535 11.1562 11.9865 11.1562 11.8125C11.1562 11.6385 11.2254 11.4715 11.3485 11.3485C11.4715 11.2254 11.6385 11.1562 11.8125 11.1562Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_1298">
<path d="M0 0H14V14H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>
</span> <span className="ml-2"> Monthly Report </span> </button>

        </div>
</div>
        {/* Overall Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Completion */}
           <ProgressCard
            icon={<TrendingUp size={20} />}
            percentage="+2%"
            title="Overall Completion"
            amount="45%"
            transactions="12 milestones"
          />

          {/* Expected Completion */}
          <ProgressCard
            icon={<TrendingUp size={20} />}
            percentage="+2%"
            title="Overall Completion"
            amount="45%"
            transactions="12 milestones"
          />
        </div>

        {/* Project Timeline */}
        {/* <div className="bg-[#11161D] rounded-2xl p-6 space-y-4">
        
          <div className="relative">
            
        

           
             <div className="relative flex justify-between">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      milestone.completed ? "bg-emerald-500" : "bg-[#1A212B]"
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500">{milestone.month}</p>
                    <p className="text-xs text-white font-medium mt-1">{milestone.label}</p>
                  </div>
                </div>
              ))}
            </div> 
          </div>
        </div> */}

        {/* Progress Updates */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Phase 2: Structural Development</h2>

          {progressUpdates.map((update) => (
            <div key={update.id} className="bg-[#11161D] rounded-2xl p-6 space-y-4">
              {/* Header */}
              {/* <div className="flex items-start justify-between"> */}
                {/* <div className="space-y-2"> */}
                    <div className="flex items-center justify-between gap-2">
                     <h3 className="text-base font-semibold text-white">{update.title}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(update.status)}
                    <span className={`text-xs px-3 py-1 rounded ${getStatusColor(update.status)}`}>
                      {update.status}
                    </span>
                  </div>
                  </div>
                 
                  {/* <p className="text-xs text-gray-500">{update.phase}</p> */}
                {/* </div> */}
                {/* <p className="text-xs text-gray-500">{update.date}</p> */}
              {/* </div> */}

              {/* Description */}
              <p className="text-sm font-normal text-[var(--color-gray-50)] ">{update.description}</p>

              {/* Progress bar */}
              {/* {update.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs text-gray-400">{update.progress}%</span>
                  </div>
                  <div className="w-full bg-[#0B0F14] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        update.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${update.progress}%` }}
                    ></div>
                  </div>
                </div>
              )} */}

              {/* Images */}
              {update.images && update.images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {update.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative h-40 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 rounded-lg overflow-hidden border border-[#1A212B]"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={image}
                          alt={`Progress ${idx + 1}`}
                          className="w-full h-full object-cover opacity-60"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F14]/50"></div>
                      </div>
                      
                    </div>
                  ))}
                  
                </div>
              )}
              <p className="text-xs font-normal text-[var(--color-gray-100)]">{update.date}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
