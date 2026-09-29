"use client";

import React from 'react';
import { ThePlaceDetails, ThePlaceItem } from '../../types/receipt';
import { formatCurrency } from '../../utils/currencyFormatter';

interface ThePlaceReceiptProps {
  details: ThePlaceDetails;
  items: ThePlaceItem[];
  receiptRef?: React.RefObject<HTMLDivElement | null>;
}

export const ThePlaceReceipt: React.FC<ThePlaceReceiptProps> = ({
  details,
  items,
  receiptRef,
}) => {
  const subtotal = items.reduce((sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.amount) || 0)), 0);
  const totalAmount = subtotal;

  return (
    <div
      ref={receiptRef}
      className="w-80 bg-white rounded-lg shadow-xl overflow-hidden font-mono text-xs sm:text-sm border border-gray-300 print-area"
      style={{ color: '#1f2937' }}
    >
      {/* Receipt Header Section */}
      <div className="p-4 mt-6 text-center border-b box-content border-gray-300">
        <p className="font-bold text-base text-gray-900">{details.storeName}</p>
        <p className="text-gray-700 leading-tight text-xs mt-1">{details.storeAddress}</p>
      </div>

      {/* Receipt Details Section */}
      <div className="p-4 border-b border-gray-300 text-xs">
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-700">Receipt #:</span>
          <span className="font-mono">{details.receiptNumber}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-700">Date:</span>
          <span>{details.receiptDate}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-700">Time:</span>
          <span>{details.time}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-700">Cashier Name:</span>
          <span>{details.cashierName}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-gray-700">Phone No:</span>
          <span>{details.cashierPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Order Type:</span>
          <span>{details.orderType}</span>
        </div>
      </div>

      {/* Items Table Header */}
      <div className="p-4 pt-3 pb-2 border-b border-gray-300">
        <div className="grid grid-cols-4 font-bold text-gray-800 text-xs">
          <span className="col-span-2">Item Name</span>
          <span className="text-center">Qty</span>
          <span className="text-right">Amount</span>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 py-2 border-b border-gray-300">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 text-gray-800 mb-1 text-xs">
            <span className="col-span-2">{item.name}</span>
            <span className="text-center">{item.qty}</span>
            <span className="text-right">{formatCurrency(item.qty * item.amount)}</span>
          </div>
        ))}
      </div>

      {/* Subtotal and Total */}
      <div className="p-4 pt-2 pb-1 border-b border-gray-300">
        <div className="flex justify-between font-bold text-gray-900 text-sm mb-1">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="text-center text-xs text-gray-600 mb-2">Settled</div>
        <div className="flex justify-between text-gray-800 text-xs">
          <span className="font-bold uppercase">{details.paymentType}</span>
          <span className="text-gray-600">{details.transferRef}</span>
          <span className="font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* Footer Message */}
      <div className="p-4 text-center text-gray-700 text-xs leading-tight">
        <p className="mb-2 font-semibold">Thank You For Patronizing!!!</p>
        <p className="mb-1">For feedbacks and enquiries</p>
        <p>08182862824, 08183742775</p>
        <p className="mb-2">WhatsApp only - 07066742998</p>
        {details.remark && <p className="mt-2 text-red-500 font-bold">Remark: {details.remark}</p>}
      </div>

      {/* Bill Preparation Details (Mimicking printed text) */}
      <div className="p-4 pt-0 text-gray-600 text-[10px] sm:text-xs">
        <p>Bill Prepared By: {details.cashierName}</p>
        <p>Bill Printed Time: {details.time}</p>
        <p>Bill Settle By: {details.cashierName}</p>
        <p>Payment Type: {details.paymentType.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default ThePlaceReceipt;
