import React from 'react';
import { FileText, Download, Eye, Star } from 'lucide-react';

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

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className="bg-white rounded-xl border hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              document.type === 'contract' ? 'bg-blue-50' :
              document.type === 'addendum' ? 'bg-purple-50' : 'bg-green-50'
            }`}>
              <FileText className={`w-5 h-5 ${
                document.type === 'contract' ? 'text-blue-500' :
                document.type === 'addendum' ? 'text-purple-500' : 'text-green-500'
              }`} />
            </div>
            <div>
              <div className="font-medium">{document.title}</div>
              <div className="text-sm text-gray-600">{document.date}</div>
            </div>
          </div>
          <button
            onClick={() => {/* Toggle star */}}
            className={`p-1 rounded hover:bg-gray-100 ${
              document.starred ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Star className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            document.status === 'signed' ? 'bg-green-100 text-green-800' :
            document.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {document.status}
          </span>
          <span className="text-sm text-gray-500">{document.size}</span>
        </div>

        {document.parties.length > 0 && (
          <div className="flex items-center gap-1 mb-4">
            {document.parties.map((party, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs"
              >
                {party.charAt(0)}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between border-t pt-3">
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <Eye className="w-4 h-4" /> View
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;

