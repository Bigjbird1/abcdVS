'use client'
import React from 'react';



interface SellerDetailsProps {
seller: {
name: string;
memberSince: string;
responseRate: string;
};
}

const SellerDetails: React.FC<SellerDetailsProps> = ({ seller }) => {

return (

<div className="bg-white rounded-xl border p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                {seller.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{seller.name}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Member since {seller.memberSince}</p>
                  <p>{seller.responseRate} response rate</p>
                </div>
              </div>
            </div>
          </div>
);
};

export default SellerDetails;

