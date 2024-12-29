import CommunicationSystem from '../components/CommunicationSystem';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">Messages</h1>
        <CommunicationSystem />
      </div>
    </div>
  );
}

