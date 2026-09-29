"use client";

import React from 'react';
import { SparDetails, SparItem } from '../../types/receipt';

interface SparFormProps {
  details: SparDetails;
  items: SparItem[];
  setDetails: React.Dispatch<React.SetStateAction<SparDetails>>;
  setItems: React.Dispatch<React.SetStateAction<SparItem[]>>;
  logoVariant: 'thermal' | 'color';
  setLogoVariant: (variant: 'thermal' | 'color') => void;
  onResetDefault: () => void;
}

export const SparForm: React.FC<SparFormProps> = ({
  details,
  items,
  setDetails,
  setItems,
  logoVariant,
  setLogoVariant,
  onResetDefault,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      const updated = { ...prev, [name]: value };
      // Keep barcode text in sync if receipt number is changed unless user customizes it
      if (name === 'receiptNumber' && (!prev.barcodeText || prev.barcodeText === prev.receiptNumber.replace(/-/g, ' '))) {
        updated.barcodeText = value.replace(/-/g, ' ');
      }
      return updated;
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof SparItem,
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
    const randomBarcode = `2007${Math.floor(100000000 + Math.random() * 900000000)}`;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "NEW ITEM",
        barcode: randomBarcode,
        unit: "PCS",
        qty: 1,
        unitPrice: 1000,
        taxCat: "A",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const generateRandomSparRefs = () => {
    const randomTill = `AU0${Math.floor(100 + Math.random() * 900)}`;
    const randomCashier = `${Math.floor(500000 + Math.random() * 99999)}`;
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randSeq = Math.floor(100000 + Math.random() * 900000);
    const newReceiptNo = `AU-01${dateCode}${randSeq}`;

    setDetails((prev) => ({
      ...prev,
      receiptNumber: newReceiptNo,
      tillNumber: randomTill,
      cashierNumber: randomCashier,
      barcodeText: newReceiptNo.replace(/-/g, ' '),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Controls / Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-red-900">Logo Style:</span>
          <div className="inline-flex rounded-md shadow-xs" role="group">
            <button
              type="button"
              onClick={() => setLogoVariant('thermal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-l-md border ${
                logoVariant === 'thermal'
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Thermal Mono (Realistic)
            </button>
            <button
              type="button"
              onClick={() => setLogoVariant('color')}
              className={`px-3 py-1.5 text-xs font-medium rounded-r-md border ${
                logoVariant === 'color'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Official Brand Color
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onResetDefault}
          className="text-xs font-medium text-red-700 hover:text-red-900 underline"
        >
          Reset to Reference SPAR Receipt
        </button>
      </div>

      {/* 1. Store Information */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🏬 Store & Contact Info</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <label className="block">
            <span className="text-xs font-medium text-gray-600">Store Name</span>
            <input
              type="text"
              name="storeName"
              value={details.storeName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Address / Location</span>
            <input
              type="text"
              name="storeAddress"
              value={details.storeAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Country Code</span>
            <input
              type="text"
              name="country"
              value={details.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Hotline Phone</span>
            <input
              type="text"
              name="hotline"
              value={details.hotline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Operating Hours</span>
            <input
              type="text"
              name="operatingHours"
              value={details.operatingHours}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Invoice Title</span>
            <input
              type="text"
              name="invoiceTitle"
              value={details.invoiceTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>
        </div>
      </div>

      {/* 2. Transaction & Cashier Meta */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🧾 Transaction & Cashier Details</span>
          </h3>
          <button
            type="button"
            onClick={generateRandomSparRefs}
            className="text-xs font-medium text-red-600 hover:text-red-800 flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-md border border-red-200"
          >
            <span>🔄 Randomize Numbers</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <label className="block md:col-span-2">
            <span className="text-xs font-medium text-gray-600">Receipt No:</span>
            <input
              type="text"
              name="receiptNumber"
              value={details.receiptNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Till No</span>
            <input
              type="text"
              name="tillNumber"
              value={details.tillNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Cashier ID</span>
            <input
              type="text"
              name="cashierNumber"
              value={details.cashierNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Date</span>
            <input
              type="text"
              name="receiptDate"
              value={details.receiptDate}
              onChange={handleChange}
              placeholder="9/18/2026"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Time</span>
            <input
              type="text"
              name="receiptTime"
              value={details.receiptTime}
              onChange={handleChange}
              placeholder="07:12 PM"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>
        </div>
      </div>

      {/* 3. Items Section */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <span>🛒 Items & Weighing Details ({items.length})</span>
          </h3>
          <button
            type="button"
            onClick={addItem}
            className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md shadow-xs flex items-center gap-1 transition"
          >
            <span>+ Add SPAR Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const lineTotal = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
            return (
              <div
                key={item.id || index}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50/70 hover:bg-gray-50 transition"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  {/* Item Name */}
                  <div className="sm:col-span-6">
                    <label className="text-[11px] font-medium text-gray-600">Item Description</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      placeholder="e.g. NIGERIAN CUISINE EBA-GARRI"
                      className="mt-0.5 block w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-semibold uppercase focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Barcode */}
                  <div className="sm:col-span-4">
                    <label className="text-[11px] font-medium text-gray-600">SKU / Barcode</label>
                    <input
                      type="text"
                      value={item.barcode}
                      onChange={(e) => handleItemChange(index, 'barcode', e.target.value)}
                      placeholder="2007094002350"
                      className="mt-0.5 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Tax Category */}
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-medium text-gray-600">Tax Cat</label>
                    <input
                      type="text"
                      value={item.taxCat}
                      onChange={(e) => handleItemChange(index, 'taxCat', e.target.value)}
                      placeholder="A"
                      className="mt-0.5 block w-full text-center rounded-md border border-gray-300 px-2 py-1.5 text-xs font-bold uppercase focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Unit */}
                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-medium text-gray-600">Unit (KGS/PCS)</label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      placeholder="KGS, PCS, 1X1"
                      className="mt-0.5 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs uppercase font-medium focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Qty */}
                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-medium text-gray-600">Quantity (Decimal OK)</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, 'qty', parseFloat(e.target.value) || 0)}
                      className="mt-0.5 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-medium text-gray-600">Unit Price (₦)</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="mt-0.5 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {/* Line Total & Remove */}
                  <div className="sm:col-span-3 flex items-end justify-between gap-2 pt-1 sm:pt-0">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Total</span>
                      <span className="text-xs font-bold font-mono text-gray-800">
                        ₦{lineTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 hover:bg-red-50 rounded"
                      title="Remove item"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Payment & Totals */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💳 Payment & Settlement</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <label className="block">
            <span className="text-xs font-medium text-gray-600">Payment Method</span>
            <input
              type="text"
              name="paymentMethod"
              value={details.paymentMethod}
              onChange={handleChange}
              placeholder="BankTransfer, POS, Cash"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Rounding</span>
            <input
              type="number"
              step="0.01"
              name="rounding"
              value={details.rounding}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>
        </div>
      </div>

      {/* 5. Legal & Footer Info */}
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
        <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📜 Legal, Tax & Footer Policy</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <label className="block md:col-span-2">
            <span className="text-xs font-medium text-gray-600">Refund Policy Note</span>
            <input
              type="text"
              name="refundPolicy"
              value={details.refundPolicy}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Machine / Allee DotNo</span>
            <input
              type="text"
              name="machineNo"
              value={details.machineNo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">SPAR VAT Registration No</span>
            <input
              type="text"
              name="vatNumber"
              value={details.vatNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Thank You Message</span>
            <input
              type="text"
              name="thankYouMessage"
              value={details.thankYouMessage}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-600">Customer Feedback Email</span>
            <input
              type="text"
              name="feedbackEmail"
              value={details.feedbackEmail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-xs font-medium text-gray-600">Bottom Barcode Text</span>
            <input
              type="text"
              name="barcodeText"
              value={details.barcodeText}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SparForm;
