import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "../ui/alert";

interface PromoCodeProps {
  onApplyPromo: (discount: {
    type: 'percentage' | 'fixed' | 'shipping',
    value: number,
    code: string
  }) => void;
  subtotal: number;
}

interface PromoCodeType {
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  expiresAt: string;
  minPurchase?: number;
}

const PromoCode: React.FC<PromoCodeProps> = ({ onApplyPromo, subtotal }) => {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [showAvailable, setShowAvailable] = useState(false);

  // This would typically come from an API/database
  const availablePromoCodes: PromoCodeType[] = [
    {
      code: 'WEDDING10',
      type: 'percentage',
      value: 10,
      expiresAt: '2025-12-31',
      minPurchase: 50
    },
    {
      code: 'FREESHIP',
      type: 'shipping',
      value: 100,
      expiresAt: '2025-12-31'
    },
    {
      code: 'SAVE20',
      type: 'fixed',
      value: 20,
      expiresAt: '2025-12-31',
      minPurchase: 100
    }
  ];

  const validatePromoCode = (code: string): PromoCodeType | null => {
    const promo = availablePromoCodes.find(p => p.code === code.toUpperCase());
    
    if (!promo) {
      return null;
    }

    // Check expiration
    if (new Date(promo.expiresAt) < new Date()) {
      setError('This promo code has expired');
      return null;
    }

    // Check minimum purchase requirement
    if (promo.minPurchase && subtotal < promo.minPurchase) {
      setError(`This code requires a minimum purchase of $${promo.minPurchase}`);
      return null;
    }

    return promo;
  };

  const handleApplyPromo = () => {
    if (appliedCode) {
      setError('You already have a promo code applied');
      return;
    }

    const promo = validatePromoCode(promoCode);
    
    if (!promo) {
      setError('Invalid promo code');
      return;
    }

    setAppliedCode(promo.code);
    setError('');
    onApplyPromo({
      type: promo.type,
      value: promo.value,
      code: promo.code
    });
    setPromoCode('');
  };

  const handleRemovePromo = () => {
    setAppliedCode(null);
    onApplyPromo({
      type: 'fixed',
      value: 0,
      code: ''
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Promo Code</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 border rounded-lg"
            disabled={!!appliedCode}
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
            disabled={!promoCode || !!appliedCode}
          >
            Apply
          </button>
        </div>
        
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        
        {appliedCode && (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
            <span className="text-green-700 text-sm">
              Promo code {appliedCode} applied!
            </span>
            <button
              onClick={handleRemovePromo}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => setShowAvailable(!showAvailable)}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          {showAvailable ? 'Hide available codes' : 'Show available codes'}
        </button>
        
        {showAvailable && (
          <div className="mt-2 space-y-2">
            {availablePromoCodes.map((promo) => (
              <div key={promo.code} className="text-sm bg-gray-50 p-2 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium">{promo.code}</span>
                  <span>
                    {promo.type === 'percentage' && `${promo.value}% off`}
                    {promo.type === 'fixed' && `$${promo.value} off`}
                    {promo.type === 'shipping' && 'Free shipping'}
                  </span>
                </div>
                {promo.minPurchase && (
                  <p className="text-gray-600">
                    Min. purchase: ${promo.minPurchase}
                  </p>
                )}
                <p className="text-gray-600">
                  Expires: {new Date(promo.expiresAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Only one promo code can be applied per order.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PromoCode;
