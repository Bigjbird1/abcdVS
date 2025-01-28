import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsProps {
  userType: "buyer" | "seller";
}

const Analytics: React.FC<AnalyticsProps> = ({ userType }) => {
  const sellerData = [
    { name: "Jan", listings: 4, views: 120, inquiries: 8 },
    { name: "Feb", listings: 6, views: 180, inquiries: 12 },
    { name: "Mar", listings: 5, views: 150, inquiries: 10 },
    { name: "Apr", listings: 8, views: 240, inquiries: 15 },
    { name: "May", listings: 10, views: 300, inquiries: 20 },
    { name: "Jun", listings: 12, views: 360, inquiries: 25 },
  ];

  const buyerData = [
    { name: "Jan", searches: 10, viewedListings: 25, savedListings: 5 },
    { name: "Feb", searches: 15, viewedListings: 35, savedListings: 8 },
    { name: "Mar", searches: 12, viewedListings: 30, savedListings: 6 },
    { name: "Apr", searches: 18, viewedListings: 40, savedListings: 10 },
    { name: "May", searches: 20, viewedListings: 50, savedListings: 12 },
    { name: "Jun", searches: 25, viewedListings: 60, savedListings: 15 },
  ];

  const data = userType === "seller" ? sellerData : buyerData;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="bg-white rounded-xl p-6 border">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {userType === "seller" ? (
              <>
                <Bar dataKey="listings" fill="#8884d8" />
                <Bar dataKey="views" fill="#82ca9d" />
                <Bar dataKey="inquiries" fill="#ffc658" />
              </>
            ) : (
              <>
                <Bar dataKey="searches" fill="#8884d8" />
                <Bar dataKey="viewedListings" fill="#82ca9d" />
                <Bar dataKey="savedListings" fill="#ffc658" />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
