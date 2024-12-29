import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface UploadModalProps {
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Implement file upload logic here
    console.log('Uploading file:', file);
    console.log('Document type:', documentType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Upload Document</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a type</option>
              <option value="contract">Contract</option>
              <option value="addendum">Addendum</option>
              <option value="venue">Venue Document</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">File</label>
            <div className="border-2 border-dashed rounded-lg p-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            disabled={!file || !documentType}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

