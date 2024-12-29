'use client'

import React, { useState } from 'react';
import { Bell, Calendar, DollarSign, MapPin, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PriceAlertComponent = () => {
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [alerts, setAlerts] = useState([]);

  const createAlert = () => {
    if (!location || !maxPrice || !preferredDate) {
      return; // Don't create alert if any field is empty
    }

    const newAlert = {
      id: Date.now(),
      location,
      maxPrice,
      preferredDate,
      dateCreated: new Date().toLocaleDateString()
    };
    setAlerts([...alerts, newAlert]);
    setLocation('');
    setMaxPrice('');
    setPreferredDate('');
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold">Price Alerts</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1 text-gray-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or region"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium mb-1 text-gray-700">Maximum Price</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Enter maximum budget"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium mb-1 text-gray-700">Preferred Date Range</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="preferredDate"
                name="preferredDate"
                type="month"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={createAlert}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Alert
          </button>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="p-6">
        <h3 className="font-semibold mb-4">Active Alerts</h3>
        {alerts.length === 0 ? (
          <Alert>
            <AlertDescription>
              You don't have any active alerts. Create one to start tracking prices!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 bg-gray-50 rounded-lg relative group">
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{alert.location}</p>
                    <p className="text-sm text-gray-600">Up to ${Number(alert.maxPrice).toLocaleString()}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.dateCreated}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Preferred date: {new Date(alert.preferredDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlertComponent;

