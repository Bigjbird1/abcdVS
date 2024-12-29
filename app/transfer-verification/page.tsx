'use client'

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ClipboardCheck, Building2, Calendar, Shield, Upload, FileText, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/ui/alert';
import ProgressTracker from '../components/transfer-verification/ProgressTracker';
import VerificationStep from '../components/transfer-verification/VerificationStep';
import UploadModal from '../components/transfer-verification/UploadModal';

const TransferVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState({
    sellerIdentity: 'pending',
    buyerIdentity: 'pending',
    venueContract: 'pending',
    transferAgreement: 'pending'
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentUploadType, setCurrentUploadType] = useState('');

  const handleUpload = (type: string) => {
    setCurrentUploadType(type);
    setShowUploadModal(true);
  };

  const handleVerify = (type: string) => {
    // Simulating verification process
    setVerificationStatus(prev => ({ ...prev, [type]: 'verified' }));
  };

  const handleSubmitForReview = () => {
    if (Object.values(verificationStatus).every(status => status === 'verified')) {
      setCurrentStep(2);
      // Here you would typically send the verification data to your backend
      console.log('All documents verified. Proceeding to venue verification.');
    } else {
      alert('Please complete all verification steps before submitting.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Transfer Verification</h1>
        <p className="text-gray-600">Complete all verification steps to proceed with the transfer</p>
      </div>

      <ProgressTracker currentStep={currentStep} />

      <Alert className="mb-6">
        <Shield className="w-4 h-4" />
        <AlertDescription>
          All documents are encrypted and securely stored. Your information is only shared with relevant parties.
        </AlertDescription>
      </Alert>

      <VerificationStep
        title="Seller Identity Verification"
        description="Upload a valid government-issued ID"
        status={verificationStatus.sellerIdentity}
        onUpload={() => handleUpload('sellerIdentity')}
        onVerify={() => handleVerify('sellerIdentity')}
      />

      <VerificationStep
        title="Buyer Identity Verification"
        description="Upload a valid government-issued ID"
        status={verificationStatus.buyerIdentity}
        onUpload={() => handleUpload('buyerIdentity')}
        onVerify={() => handleVerify('buyerIdentity')}
      />

      <VerificationStep
        title="Venue Contract Verification"
        description="Upload the original venue contract"
        status={verificationStatus.venueContract}
        onUpload={() => handleUpload('venueContract')}
        onVerify={() => handleVerify('venueContract')}
      />

      <VerificationStep
        title="Transfer Agreement"
        description="Upload the signed transfer agreement"
        status={verificationStatus.transferAgreement}
        onUpload={() => handleUpload('transferAgreement')}
        onVerify={() => handleVerify('transferAgreement')}
      />

      <div className="flex justify-between mt-8 pt-6 border-t">
        <button className="px-6 py-2 text-gray-600 hover:text-gray-900">
          Save Progress
        </button>
        <button 
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          onClick={handleSubmitForReview}
        >
          Submit for Review
        </button>
      </div>

      {showUploadModal && (
        <UploadModal
          documentType={currentUploadType}
          onClose={() => setShowUploadModal(false)}
          onUpload={(file) => {
            console.log(`Uploading ${currentUploadType} document:`, file);
            setShowUploadModal(false);
            // Here you would typically handle the file upload to your backend
          }}
        />
      )}
    </div>
  );
};

export default TransferVerification;

