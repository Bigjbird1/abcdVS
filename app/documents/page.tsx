"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  Shield,
  Folder,
  ChevronDown,
  Star,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FolderList from "../components/documents/FolderList";
import DocumentGrid from "../components/documents/DocumentGrid";
import SearchBar from "../components/documents/SearchBar";
import UploadModal from "../components/documents/UploadModal";

const DocumentStorage = () => {
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folders = [
    { id: "all", name: "All Documents", count: 24 },
    { id: "contracts", name: "Contracts", count: 12 },
    { id: "addendums", name: "Addendums", count: 6 },
    { id: "venue", name: "Venue Documents", count: 4 },
    { id: "archived", name: "Archived", count: 2 },
  ];

  const documents = [
    {
      id: 1,
      type: "contract",
      title: "Wedding Date Transfer Agreement",
      date: "2024-02-20",
      size: "2.4 MB",
      status: "signed",
      parties: ["Sarah M.", "Emma D."],
      starred: true,
    },
    {
      id: 2,
      type: "addendum",
      title: "Payment Schedule Addendum",
      date: "2024-02-20",
      size: "1.1 MB",
      status: "pending",
      parties: ["Sarah M.", "Emma D."],
      starred: false,
    },
    {
      id: 3,
      type: "venue",
      title: "Venue Policy Document",
      date: "2024-02-19",
      size: "3.2 MB",
      status: "verified",
      parties: ["Grand Estate"],
      starred: false,
    },
  ];

  const filteredDocuments = documents.filter(
    (doc) =>
      (selectedFolder === "all" || doc.type === selectedFolder) &&
      (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.parties.some((party) =>
          party.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Document Storage</h1>
              <button
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                onClick={() => setShowUploadModal(true)}
              >
                Upload Document
              </button>
            </div>

            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border">
          <div className="flex">
            <FolderList
              folders={folders}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
            />

            <div className="flex-1 p-6">
              <DocumentGrid documents={filteredDocuments} />
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default DocumentStorage;
