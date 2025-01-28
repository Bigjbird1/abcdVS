import React from "react";
import { ChevronRight, Truck } from "lucide-react";

const RecentOrders = () => {
  const orders = [
    {
      id: "ORD-123",
      date: "2024-02-20",
      status: "In Transit",
      total: 450,
      items: 3,
      tracking: "1Z999AA1234567890",
    },
    {
      id: "ORD-122",
      date: "2024-02-15",
      status: "Delivered",
      total: 899,
      items: 1,
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
      <div className="bg-white rounded-xl border divide-y">
        {orders.map((order) => (
          <div key={order.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="font-medium">Order {order.id}</h3>
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="font-medium">${order.total}</div>
                <p className="text-sm text-gray-600">{order.items} items</p>
              </div>
            </div>

            {order.tracking && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Package in transit</p>
                  <p className="text-sm text-gray-600">
                    Tracking: {order.tracking}
                  </p>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  Track order
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
