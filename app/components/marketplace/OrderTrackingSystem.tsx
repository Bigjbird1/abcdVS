import React, { useState } from 'react';
import {
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Search,
  Filter,
  Download,
  X
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  message: string;
}

interface TrackingInfo {
  carrier: string;
  number: string;
  status: string;
  estimatedDelivery: string;
  lastUpdate: string;
  currentLocation: string;
  history: TrackingEvent[];
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';
  tracking: TrackingInfo;
  items: OrderItem[];
}

const OrderTrackingSystem: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data for orders (shortened for brevity)
  const orders: Order[] = [
    {
      id: 'ORD-12345',
      date: '2024-02-25',
      total: 1299.99,
      status: 'in_transit',
      tracking: {
        carrier: 'FedEx',
        number: '1234567890',
        status: 'in_transit',
        estimatedDelivery: '2024-03-01',
        lastUpdate: '2024-02-28T10:30:00',
        currentLocation: 'San Francisco, CA',
        history: [
          {
            status: 'order_placed',
            location: 'Online',
            timestamp: '2024-02-25T15:30:00',
            message: 'Order confirmed'
          },
          {
            status: 'processing',
            location: 'Wedding Boutique',
            timestamp: '2024-02-26T09:15:00',
            message: 'Order processing started'
          },
          {
            status: 'shipped',
            location: 'Los Angeles, CA',
            timestamp: '2024-02-27T14:20:00',
            message: 'Package shipped'
          },
          {
            status: 'in_transit',
            location: 'San Francisco, CA',
            timestamp: '2024-02-28T10:30:00',
            message: 'Package in transit'
          }
        ]
      },
      items: [
        {
          id: 1,
          name: 'Vintage Wedding Dress',
          price: 899.99,
          quantity: 1,
          image: '/api/placeholder/100/100?text=Wedding-Dress'
        },
        {
          id: 2,
          name: 'Crystal Centerpieces',
          price: 400.00,
          quantity: 2,
          image: '/api/placeholder/100/100?text=Centerpiece'
        }
      ]
    }
  ];

  const statusStyles: Record<Order['status'], { color: string; bg: string }> = {
    pending: { color: 'text-yellow-600', bg: 'bg-yellow-50' },
    processing: { color: 'text-blue-600', bg: 'bg-blue-50' },
    shipped: { color: 'text-purple-600', bg: 'bg-purple-50' },
    in_transit: { color: 'text-indigo-600', bg: 'bg-indigo-50' },
    delivered: { color: 'text-green-600', bg: 'bg-green-50' },
    cancelled: { color: 'text-red-600', bg: 'bg-red-50' }
  };

  const renderTrackingTimeline = (tracking: TrackingInfo) => (
    <div className="space-y-4">
      {tracking.history.map((event: TrackingEvent, index: number) => (
        <div key={index} className="flex gap-3">
          <div className={`mt-1.5 w-2 h-2 rounded-full ${
            index === 0 ? 'bg-green-500' : 'bg-gray-300'
          }`} />
          <div className="flex-1">
            <div className="flex justify-between">
              <p className="font-medium">{event.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">{event.location}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your recent orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="p-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'pending', 'processing', 'shipped', 'delivered'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg ${
              activeFilter === filter
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Order {order.id}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      statusStyles[order.status].color
                    } ${statusStyles[order.status].bg}`}>
                      {order.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       order.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total}</p>
                  <p className="text-sm text-gray-600">{order.items.length} items</p>
                </div>
              </div>

              {/* Quick Tracking Overview */}
              {order.tracking && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{order.tracking.carrier}</p>
                      <span className="text-sm text-gray-600">
                        • {order.tracking.number}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Last updated: {new Date(order.tracking.lastUpdate).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    Track Order
                  </button>
                </div>
              )}

              {/* Expandable Items List */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full mt-4 flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                {expandedOrder === order.id ? (
                  <>Hide items <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Show items <ChevronDown className="w-4 h-4" /></>
                )}
              </button>

              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Order {selectedOrder.id}</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Carrier</p>
                    <p className="font-medium">{selectedOrder.tracking.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-medium">{selectedOrder.tracking.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.tracking.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Tracking Timeline</h3>
                  {renderTrackingTimeline(selectedOrder.tracking)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingSystem;
