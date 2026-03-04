"use client";

import { Search, Download, FileText, Badge } from "lucide-react";
import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: projectData } = useApi({ url: "/api/project" });

  const documents =
    projectData?.documents || { legal: [], progress: [], decisions: [] };

  const tabs = [
    { id: "all", name: "All Files" },
    { id: "legal", name: "Agreements & Legal" },
    { id: "progress", name: "Progress Reports" },
    { id: "decisions", name: "Board Decisions" },
    { id: "blueprints", name: "Blueprints" },
  ];

  const getDocumentsForTab = () => {
    if (activeTab === "all") {
      return [...documents.legal, ...documents.progress, ...documents.decisions];
    }
    return documents[activeTab] || [];
  };

  const displayDocs = getDocumentsForTab();

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <div className="w-full p-6 mx-auto space-y-6">

        {/* Tabs */}
        <div className="border-b border-[#1A212B] flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 mb-2 px-3 text-sm font-medium text-[var(--color-gray-50)] transition cursor-pointer ${
                activeTab === tab.id
                  ? "text-white  bg-[#232323] rounded-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
<div className="grid grid-cols-12 gap-6">
   <div className="col-span-12 lg:col-span-8 space-y-6">
        {/* Documents Content */}
        <div className="space-y-6">
          {/* Legal & Agreements Section */}
          {(activeTab === "all" || activeTab === "legal") && documents.legal.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-end">
              <h2 className="text-lg font-semibold text-white flex  gap-2">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1526)">
<g clip-path="url(#clip1_1_1526)">
<path d="M2.25 0C1.00898 0 0 1.00898 0 2.25V15.75C0 16.991 1.00898 18 2.25 18H11.25C12.491 18 13.5 16.991 13.5 15.75V5.625H9C8.37773 5.625 7.875 5.12227 7.875 4.5V0H2.25ZM9 0V4.5H13.5L9 0ZM2.8125 2.25H5.0625C5.37187 2.25 5.625 2.50312 5.625 2.8125C5.625 3.12188 5.37187 3.375 5.0625 3.375H2.8125C2.50312 3.375 2.25 3.12188 2.25 2.8125C2.25 2.50312 2.50312 2.25 2.8125 2.25ZM2.8125 4.5H5.0625C5.37187 4.5 5.625 4.75313 5.625 5.0625C5.625 5.37187 5.37187 5.625 5.0625 5.625H2.8125C2.50312 5.625 2.25 5.37187 2.25 5.0625C2.25 4.75313 2.50312 4.5 2.8125 4.5ZM4.71797 13.4227C4.50352 14.1363 3.84609 14.625 3.10078 14.625H2.8125C2.50312 14.625 2.25 14.3719 2.25 14.0625C2.25 13.7531 2.50312 13.5 2.8125 13.5H3.10078C3.35039 13.5 3.56836 13.3383 3.63867 13.0992L4.1625 11.359C4.28203 10.9617 4.64766 10.6875 5.0625 10.6875C5.47734 10.6875 5.84297 10.9582 5.9625 11.359L6.37031 12.716C6.63047 12.498 6.96094 12.375 7.3125 12.375C7.87148 12.375 8.38125 12.6914 8.63086 13.1906L8.78555 13.5H10.6875C10.9969 13.5 11.25 13.7531 11.25 14.0625C11.25 14.3719 10.9969 14.625 10.6875 14.625H8.4375C8.22305 14.625 8.02969 14.5055 7.93477 14.3156L7.62539 13.6934C7.56562 13.5738 7.44609 13.5 7.31602 13.5C7.18594 13.5 7.06289 13.5738 7.00664 13.6934L6.69727 14.3156C6.59531 14.523 6.37383 14.6461 6.14531 14.625C5.9168 14.6039 5.71992 14.4457 5.65664 14.2277L5.0625 12.2695L4.71797 13.4227Z" fill="white"/>
</g>
</g>
<defs>
<clipPath id="clip0_1_1526">
<rect width="13.5" height="18" fill="white"/>
</clipPath>
<clipPath id="clip1_1_1526">
<path d="M0 0H13.5V18H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

                Legal & Agreements
              </h2>
              <p className="text-xs font-normal  text-[var(--color-gray-50)]">2 files</p>
              </div>
            <div className="border border-[#1A212B] rounded-lg overflow-hidden">
  {documents.legal.map((doc, index) => {
    const isLast = index === documents.legal.length - 1;
    const iconMap = { FileText };
    const IconComp = iconMap[doc.icon] || FileText;

    return (
      <div
        key={doc.id}
        className={`
          bg-[#11161D] p-4 flex items-center justify-between
          hover:bg-[#151B23] transition group
          ${isLast ? "rounded-b-lg" : "border-b border-[#1A212B]"}
        `}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-[#0B0F14] rounded-lg">
            <IconComp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{doc.name}</p>
            <p className="text-xs font-normal text-[var(--color-gray-50)] mt-1">
              {doc.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <span className="text-xs text-gray-400">{doc.size}</span>
          <button className="p-2 text-gray-400 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  })}
</div>
            </div>
          )}

          {/* Progress Reports Section */}
          {(activeTab === "all" || activeTab === "progress") && documents.progress.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1536)">
<path d="M10.6875 8.4375V0.583594C10.6875 0.267188 10.9336 0 11.25 0C15.5988 0 19.125 3.52617 19.125 7.875C19.125 8.19141 18.8578 8.4375 18.5414 8.4375H10.6875ZM1.125 9.5625C1.125 5.29805 4.29258 1.76836 8.40234 1.20586C8.72578 1.16016 9 1.42031 9 1.74727V10.125L14.502 15.627C14.7375 15.8625 14.7199 16.2492 14.4492 16.4391C13.0711 17.4234 11.3836 18 9.5625 18C4.9043 18 1.125 14.2242 1.125 9.5625ZM19.6313 10.125C19.9582 10.125 20.2148 10.3992 20.1727 10.7227C19.902 12.6879 18.9562 14.4352 17.5746 15.7254C17.3637 15.9223 17.0332 15.9082 16.8293 15.7008L11.25 10.125H19.6313Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_1536">
<path d="M0 0H20.25V18H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

                Progress Reports
              </h2>
               <div className="border border-[#1A212B] rounded-lg overflow-hidden">
  {documents.progress.map((doc, index) => {
    const isLast = index === documents.progress.length - 1;
    const iconMap = { FileText };
    const IconComp = iconMap[doc.icon] || FileText;

    return (
      <div
        key={doc.id}
        className={`
          bg-[#11161D] p-4 flex items-center justify-between
          hover:bg-[#151B23] transition group
          ${isLast ? "rounded-b-lg" : "border-b border-[#1A212B]"}
        `}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-[#0B0F14] rounded-lg">
            <IconComp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{doc.name}</p>
            <p className="text-xs font-normal text-[var(--color-gray-50)] mt-1">
              {doc.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <span className="text-xs text-gray-400">{doc.size}</span>
          <button className="p-2 text-gray-400 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  })}
</div>
            </div>
          )}

          {/* Official Decisions Section */}
          {(activeTab === "all" || activeTab === "decisions") && documents.decisions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_1546)">
<path d="M11.201 0.330444C10.7615 -0.109009 10.0479 -0.109009 9.6084 0.330444L5.38965 4.54919C4.9502 4.98865 4.9502 5.70232 5.38965 6.14177L5.95215 6.70427C6.3916 7.14373 7.10527 7.14373 7.54473 6.70427L7.68535 6.56365L11.44 10.3148L11.2994 10.4554C10.86 10.8949 10.86 11.6086 11.2994 12.048L11.8619 12.6105C12.3014 13.05 13.015 13.05 13.4545 12.6105L17.6732 8.39177C18.1127 7.95232 18.1127 7.23865 17.6732 6.79919L17.1107 6.23669C16.6713 5.79724 15.9576 5.79724 15.5182 6.23669L15.3775 6.37732L11.6229 2.62263L11.7635 2.48201C12.2029 2.04255 12.2029 1.32888 11.7635 0.889429L11.201 0.326929V0.330444ZM5.85723 10.4554C5.41777 10.016 4.7041 10.016 4.26465 10.4554L0.327148 14.3929C-0.112305 14.8324 -0.112305 15.5461 0.327148 15.9855L2.01465 17.673C2.4541 18.1125 3.16777 18.1125 3.60723 17.673L7.54473 13.7355C7.98418 13.2961 7.98418 12.5824 7.54473 12.1429L7.49551 12.0937L9.5627 10.0301L7.97012 8.43748L5.90645 10.5011L5.85723 10.4519V10.4554Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1_1546">
<path d="M0 0H18V18H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

                Official Decisions
              </h2>
              <div className="border border-[#1A212B] rounded-lg overflow-hidden">
  {documents.decisions.map((doc, index) => {
    const isLast = index === documents.decisions.length - 1;
    const iconMap = { FileText };
    const IconComp = iconMap[doc.icon] || FileText;

    return (
      <div
        key={doc.id}
        className={`
          bg-[#11161D] p-4 flex items-center justify-between
          hover:bg-[#151B23] transition group
          ${isLast ? "rounded-b-lg" : "border-b border-[#1A212B]"}
        `}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="p-3 bg-[#0B0F14] rounded-lg">
            <IconComp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{doc.name}</p>
            <p className="text-xs font-normal text-[var(--color-gray-50)] mt-1">
              {doc.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-right">
          <span className="text-xs text-gray-400">{doc.size}</span>
          <button className="p-2 text-gray-400 hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  })}
</div>
            </div>
          )}

          {/* Blueprints Empty State */}
          {activeTab === "blueprints" && (
            <div className="bg-[#11161D] rounded-lg p-12 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No blueprint files available yet</p>
            </div>
          )}
        </div>
        </div>


         <div className="col-span-12 lg:col-span-4">
    <div className="bg-gradient-to-b from-[#0F141A] to-[#0B0F14] border border-[#1A212B] rounded-xl p-6">
  <h3 className="text-sm font-semibold text-[var(--color-gray-50)] mb-6">
    Recent Activity
  </h3>

  <div className="space-y-6">

    {/* Item 1 */}
    <div className="flex gap-3">
      <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
      <div>
        <p className="text-sm font-normal text-white">New decision uploaded</p>
        <p className="text-xs font-normal text-[var(--color-gray-100)]  mt-1">
          "Approval of Phase 2..." by Admin
        </p>
        <p className="text-xs font-normal text-[#4B5563] mt-1">2 hours ago</p>
      </div>
    </div>

    {/* Item 2 */}
    <div className="flex gap-3">
      <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
      <div>
        <p className="text-sm font-normal text-white">New File Uploaded</p>
        <p className="text-xs font-normal text-[var(--color-gray-100)] mt-1">
          Initial Investment Agreement
        </p>
        <p className="text-xs font-normal text-[#4B5563] mt-1">Yesterday</p>
      </div>
    </div>

    {/* Item 3 */}
    <div className="flex gap-3">
      <div className="mt-1 w-2 h-2 rounded-full bg-gray-400" />
      <div>
        <p className="text-sm font-normal text-white">Q3 File Uploaded</p>
        <p className="text-xs font-normal text-[var(--color-gray-100)] mt-1">
          Old Site Plan v1.0
        </p>
        <p className="text-xs font-normal text-[#4B5563] mt-1">3 days ago</p>
      </div>
    </div>

  </div>
</div>
  </div>
        </div>
      </div>
    </main>
  );
}
