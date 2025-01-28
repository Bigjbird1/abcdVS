import React from "react";
import DocumentCard from "./DocumentCard";

interface Document {
  id: number;
  type: string;
  title: string;
  date: string;
  size: string;
  status: string;
  parties: string[];
  starred: boolean;
}

interface DocumentGridProps {
  documents: Document[];
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ documents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentGrid;
