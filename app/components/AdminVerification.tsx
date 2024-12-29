'use client'

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const VerificationStatus = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-sm ${styles[status as keyof typeof styles]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface Document {
  type: string;
  url: string;
  status: string;
}

interface Application {
  id: number;
  name: string;
  email: string;
  status: string;
  submittedAt: string;
  type: string;
  documents: Document[];
}

const AdminVerification = () => {
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const mockApplications: Application[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      email: "sarah@example.com",
      status: "pending",
      submittedAt: "2024-01-20T10:30:00",
      type: "seller",
      documents: [
        { type: "ID", url: "#", status: "pending" },
        { type: "Venue Contract", url: "#", status: "pending" }
      ]
    },
    {
      id: 2,
      name: "Michael Johnson",
      email: "michael@example.com",
      status: "pending",
      submittedAt: "2024-01-19T15:45:00",
      type: "seller",
      documents: [
        { type: "ID", url: "#", status: "pending" },
        { type: "Venue Contract", url: "#", status: "pending" }
      ]
    }
  ];

  const handleApprove = () => {
    // Handle approval logic
    console.log('Approved');
  };

  const handleReject = () => {
    // Handle rejection logic
    console.log('Rejected');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold">Identity Verification</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm">12 pending</span>
              </div>
              <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">
                Review Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Applications List */}
          <div className="col-span-5">
            <div className="bg-white rounded-xl border">
              {/* Filters */}
              <div className="p-4 border-b">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedStatus('pending')}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedStatus === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Pending Review
                  </button>
                  <button
                    onClick={() => setSelectedStatus('approved')}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedStatus === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setSelectedStatus('rejected')}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedStatus === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Rejected
                  </button>
                </div>
              </div>

              {/* Applications */}
              <div className="divide-y">
                {mockApplications.map((application) => (
                  <button
                    key={application.id}
                    onClick={() => setSelectedApplication(application)}
                    className={`w-full p-4 text-left hover:bg-gray-50 ${
                      selectedApplication?.id === application.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{application.name}</span>
                      <span className="text-sm text-gray-600">
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{application.email}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-sm">
                        {application.type}
                      </span>
                      <VerificationStatus status={application.status} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div className="col-span-7">
            {selectedApplication ? (
              <div className="bg-white rounded-xl border">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{selectedApplication.name}</h2>
                      <p className="text-gray-600">{selectedApplication.email}</p>
                    </div>
                    <VerificationStatus status={selectedApplication.status} />
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Document Review */}
                  <div>
                    <h3 className="font-medium mb-4">Submitted Documents</h3>
                    <div className="space-y-4">
                      {selectedApplication.documents.map((doc, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-medium">{doc.type}</div>
                            <VerificationStatus status={doc.status} />
                          </div>
                          <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4">
                            {/* Document preview would go here */}
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                              View Full Size
                            </button>
                            <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50">
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleReject}
                        className="py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Reject Application
                      </button>
                      <button
                        onClick={handleApprove}
                        className="py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Approve Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <AlertCircle className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Application Selected</h3>
                <p className="text-gray-600">
                  Select an application from the list to review
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVerification;

