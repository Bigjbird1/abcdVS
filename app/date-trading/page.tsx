import DateTradingBoard from '../components/DateTradingBoard';

export default function DateTradingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-6">Date Trading Board</h1>
        <DateTradingBoard />
      </div>
    </div>
  );
}

