"use client";

import React from 'react';
import { ThePlaceDetails, ThePlaceItem } from '../../types/receipt';

interface ThePlaceFormProps {
  details: ThePlaceDetails;
  items: ThePlaceItem[];
  setDetails: React.Dispatch<React.SetStateAction<ThePlaceDetails>>;
  setItems: React.Dispatch<React.SetStateAction<ThePlaceItem[]>>;
  onResetDefault: () => void;
}

export const ThePlaceForm: React.FC<ThePlaceFormProps> = ({
  details,
  items,
  setDetails,
  setItems,
  onResetDefault,
}) => {
  const handleDetailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof ThePlaceItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const addItem = () => {
    setItems((prev) => [...prev, { name: "", unit: "Pcs", qty: 1, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const generateRandomRefs = () => {
    const randomReceiptNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
    const randomTransferRef = `#${Math.floor(100000 + Math.random() * 900000)}`;

    setDetails((prev) => ({
      ...prev,
      receiptNumber: randomReceiptNumber,
      transferRef: randomTransferRef,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onResetDefault}
          className="text-xs font-medium text-amber-700 hover:text-amber-900 underline"
        >
          Reset to Default The Place Data
        </button>
      </div>

      {/* Store Information Section */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🏪 Store Information</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Store Name:</span>
            <input
              type="text"
              name="storeName"
              value={details.storeName}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Store Email/Address:</span>
            <input
              type="text"
              name="storeAddress"
              value={details.storeAddress}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block relative">
            <span className="text-gray-700 text-sm font-medium">Receipt Number:</span>
            <div className="relative mt-1">
              <input
                type="text"
                name="receiptNumber"
                value={details.receiptNumber}
                onChange={handleDetailChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={generateRandomRefs}
                className="absolute right-2 top-2 text-gray-500 hover:text-amber-600 focus:outline-none"
                title="Generate Random Number"
              >
                🔄
              </button>
            </div>
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Date:</span>
            <input
              type="date"
              name="receiptDate"
              value={details.receiptDate}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Time:</span>
            <input
              type="time"
              name="time"
              value={details.time}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Cashier Name:</span>
            <input
              type="text"
              name="cashierName"
              value={details.cashierName}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Cashier Phone:</span>
            <input
              type="text"
              name="cashierPhone"
              value={details.cashierPhone}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Order Type:</span>
            <select
              name="orderType"
              value={details.orderType}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            >
              <option value="Take-Away">Take-Away</option>
              <option value="Dine-In">Dine-In</option>
              <option value="Delivery">Delivery</option>
            </select>
          </label>
        </div>
      </div>

      {/* Items Section */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🍽️ Food & Menu Items ({items.length})</span>
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md shadow-xs flex items-center gap-1 transition"
          >
            <span>+ Add Menu Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-end p-2.5 border border-gray-200 rounded-md bg-gray-50/70"
            >
              <label className="block col-span-2">
                <span className="text-gray-700 text-xs font-medium">Item Name:</span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-semibold focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs font-medium">Unit:</span>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs font-medium">Qty:</span>
                <input
                  type="number"
                  value={item.qty}
                  min="1"
                  onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value, 10) || 1)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs font-medium">Amount:</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="col-span-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition text-xs h-9 w-full shadow-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment and Other Details Section */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💳 Payment & Remarks</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700 text-sm font-medium">Payment Type:</span>
            <input
              type="text"
              name="paymentType"
              value={details.paymentType}
              onChange={handleDetailChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </label>
          <label className="block relative">
            <span className="text-gray-700 text-sm font-medium">Transfer Reference:</span>
            <div className="relative mt-1">
              <input
                type="text"
                name="transferRef"
                value={details.transferRef}
                onChange={handleDetailChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm font-mono focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={generateRandomRefs}
                className="absolute right-2 top-2 text-gray-500 hover:text-amber-600 focus:outline-none"
                title="Generate Random Ref"
              >
                🔄
              </button>
            </div>
          </label>
        </div>
        <label className="block mt-4">
          <span className="text-gray-700 text-sm font-medium">Remark:</span>
          <textarea
            name="remark"
            value={details.remark}
            onChange={handleDetailChange}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          ></textarea>
        </label>
      </div>
    </div>
  );
};

export default ThePlaceForm;
