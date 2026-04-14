"use client";

import { useState } from "react";
import NdaForm, { NdaFormData, defaultFormData } from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import { generateNdaMarkdown } from "@/lib/generateNda";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  function handleDownload() {
    const md = generateNdaMarkdown(formData);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mutual-nda.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-900">
            Mutual NDA Creator
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save PDF
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Download .md
            </button>
          </div>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="sm:hidden flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "form"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Form
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "preview"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:grid sm:grid-cols-2 sm:gap-8">
        {/* Form panel */}
        <div className={`${activeTab !== "form" ? "hidden sm:block" : ""}`}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <NdaForm data={formData} onChange={setFormData} />
          </div>
        </div>

        {/* Preview panel */}
        <div className={`${activeTab !== "preview" ? "hidden sm:block" : ""}`}>
          <div className="sm:sticky sm:top-[3.75rem]">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-h-[calc(100vh-5.5rem)] overflow-y-auto print:border-0 print:shadow-none print:max-h-none print:overflow-visible">
              <NdaPreview data={formData} />
            </div>
            <p className="mt-2 text-xs text-gray-400 text-center print:hidden">
              Common Paper MNDA Version 1.0 — CC BY 4.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
