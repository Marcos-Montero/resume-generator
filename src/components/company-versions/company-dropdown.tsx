"use client";

import { useEffect, useState, useRef } from "react";
import { Building2, ChevronDown, Plus, History, Edit2, Trash2, X } from "lucide-react";
import { useCompanyVersionsStore } from "@/store/company-versions-store";
import { useResumeStore } from "@/store/resume-store";

export function CompanyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const {
    companies,
    fetchCompanies,
    selectCompany,
    setModalOpen,
    deleteCompany,
  } = useCompanyVersionsStore();
  
  const { setResumeData, setActiveCompanyVersion, activeCompanyVersion, clearCompanyVersion } = useResumeStore();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAndLoadCompany = async (companyId: string) => {
    setIsOpen(false);
    
    try {
      const response = await fetch(`/api/company-versions/${companyId}`);
      const data = await response.json();
      
      if (data.success && data.history) {
        const history = data.history;
        const currentVersion = history.versions.find(
          (v: { id: string }) => v.id === history.currentVersionId
        );
        
        if (currentVersion) {
          setResumeData(currentVersion.resumeData);
          setActiveCompanyVersion(currentVersion);
          selectCompany(companyId);
        }
      }
    } catch (error) {
      console.error("Failed to load company version:", error);
    }
  };

  const handleClearCompanyVersion = () => {
    clearCompanyVersion();
    selectCompany(null);
  };

  const handleDeleteCompany = async (e: React.MouseEvent, companyId: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this company and all its versions?")) {
      await deleteCompany(companyId);
      if (activeCompanyVersion?.companyId === companyId) {
        clearCompanyVersion();
      }
    }
  };

  return (
    <div className="relative flex items-center gap-1" ref={dropdownRef}>
      {activeCompanyVersion && (
        <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 border border-purple-300 rounded-lg">
          <span className="text-xs font-medium text-purple-800 max-w-[100px] truncate">
            {activeCompanyVersion.companyName}
          </span>
          <button
            onClick={handleClearCompanyVersion}
            className="p-0.5 text-purple-600 hover:text-purple-800 rounded"
            title="Clear company CV"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg transition-colors ${
          activeCompanyVersion
            ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
            : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
        }`}
      >
        <Building2 className="w-4 h-4" />
        <span className="hidden md:inline max-w-[120px] truncate">
          {activeCompanyVersion ? "Switch" : "Company CVs"}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2 border-b border-gray-100">
            <button
              onClick={() => {
                setIsOpen(false);
                setModalOpen(true, "create");
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create CV for Company
            </button>
          </div>

          {companies.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No company CVs yet
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              {companies.map((company) => (
                <div
                  key={company.companyId}
                  className={`flex items-center justify-between px-3 py-2 hover:bg-gray-50 cursor-pointer ${
                    activeCompanyVersion?.companyId === company.companyId ? "bg-purple-100 border-l-2 border-purple-500" : ""
                  }`}
                  onClick={() => handleSelectAndLoadCompany(company.companyId)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {company.companyName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {company.jobTitle} • v{company.versionCount}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCompany(company.companyId);
                        setModalOpen(true, "history");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      title="Version history"
                    >
                      <History className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectCompany(company.companyId);
                        setModalOpen(true, "edit");
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteCompany(e, company.companyId)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
