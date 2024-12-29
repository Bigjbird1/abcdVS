import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
interface ReportModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Report Review</h3>
        
        <Alert className="mb-4">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            Our moderation team will review this report within 24 hours.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Report</label>
            <select id="reason" name="reason" className="w-full p-2 border rounded-lg">
              <option>Inappropriate content</option>
              <option>Spam</option>
              <option>False information</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">Additional Details</label>
            <textarea
              id="details"
              name="details"
              className="w-full p-2 border rounded-lg"
              rows={4}
              placeholder="Please provide more information..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800"
            >
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;

