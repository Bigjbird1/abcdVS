import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  month: number;
  averagePrice: number;
  listingCount: number;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SeasonalityChart = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'price' | 'volume'>('price');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPriceData = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('date, price');

      if (error) {
        console.error('Error fetching price data:', error);
        setLoading(false);
        return;
      }

      // Process the data to get monthly averages
      const monthlyData = data.reduce((acc: Record<number, { total: number; count: number }>, item) => {
        const month = new Date(item.date).getMonth();
        if (!acc[month]) {
          acc[month] = { total: 0, count: 0 };
        }
        acc[month].total += item.price;
        acc[month].count += 1;
        return acc;
      }, {});

      // Convert to array format and calculate averages
      const processedData: PriceData[] = Object.entries(monthlyData).map(([month, data]) => ({
        month: parseInt(month),
        averagePrice: Math.round(data.total / data.count),
        listingCount: data.count
      }));

      // Sort by month
      processedData.sort((a, b) => a.month - b.month);
      setPriceData(processedData);
      setLoading(false);
    };

    fetchPriceData();
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: viewMode === 'price' 
          ? 'Average Wedding Date Prices by Month'
          : 'Number of Available Dates by Month',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function(value: number | string) {
            if (typeof value === 'number') {
              return viewMode === 'price'
                ? `$${value.toLocaleString()}`
                : Math.round(value).toString();
            }
            return value;
          },
        },
      },
    },
  };

  const chartData = {
    labels: priceData.map(d => monthNames[d.month]),
    datasets: [
      {
        label: viewMode === 'price' ? 'Average Price' : 'Number of Listings',
        data: viewMode === 'price' 
          ? priceData.map(d => d.averagePrice)
          : priceData.map(d => d.listingCount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading seasonality data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Wedding Date Seasonality</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('price')}
            className={`px-4 py-2 rounded ${
              viewMode === 'price'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Price Trends
          </button>
          <button
            onClick={() => setViewMode('volume')}
            className={`px-4 py-2 rounded ${
              viewMode === 'volume'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Availability
          </button>
        </div>
      </div>

      <div className="h-[400px]">
        {viewMode === 'price' ? (
          <Line options={chartOptions} data={chartData} />
        ) : (
          <Bar options={chartOptions} data={chartData} />
        )}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Key Insights:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          {priceData.length > 0 && (
            <>
              <li>
                Peak Season: {monthNames[
                  priceData.reduce((max, curr) => 
                    curr.averagePrice > priceData[max].averagePrice ? curr.month : max
                  , 0)
                ]}
              </li>
              <li>
                Most Available: {monthNames[
                  priceData.reduce((max, curr) => 
                    curr.listingCount > priceData[max].listingCount ? curr.month : max
                  , 0)
                ]}
              </li>
              <li>
                Best Value: {monthNames[
                  priceData.reduce((best, curr) => {
                    const currentValue = curr.listingCount / curr.averagePrice;
                    const bestValue = priceData[best].listingCount / priceData[best].averagePrice;
                    return currentValue > bestValue ? curr.month : best;
                  }, 0)
                ]}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SeasonalityChart;
