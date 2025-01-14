'use client'
import { useParams } from 'next/navigation';
import PaymentEscrow from '../../../components/PaymentEscrow';

export default function PaymentEscrowPage() {
  const params = useParams();
  const listingId = params?.id as string;

  if (!listingId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-semibold mb-6">Error</h1>
          <p className="mb-8 text-gray-600">Invalid listing ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-6">Payment & Escrow</h1>
        <p className="mb-8 text-gray-600">Listing ID: {listingId}</p>
        <PaymentEscrow listingId={listingId} />
      </div>
    </div>
  );
}
