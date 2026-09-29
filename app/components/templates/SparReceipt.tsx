"use client";

import React from 'react';
import { SparDetails, SparItem } from '../../types/receipt';
import SparLogo from '../SparLogo';
import Barcode from '../Barcode';

interface SparReceiptProps {
  details: SparDetails;
  items: SparItem[];
  receiptRef?: React.RefObject<HTMLDivElement | null>;
  logoVariant?: 'thermal' | 'color';
}

export const SparReceipt: React.FC<SparReceiptProps> = ({
  details,
  items,
  receiptRef,
  logoVariant = 'thermal',
}) => {
  // Compute totals
  const totalQuantity = items.reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
  const totalAmount = items.reduce((acc, it) => acc + ((Number(it.qty) || 0) * (Number(it.unitPrice) || 0)), 0);

  // 7.5% Nigerian standard VAT breakdown
  // Total is inclusive of 7.5% VAT:
  // Excl = Total / 1.075, Tax = Total - Excl
  const vatRate = 0.075;
  const exclOfTax = totalAmount > 0 ? totalAmount / (1 + vatRate) : 0;
  const taxAmount = totalAmount - exclOfTax;

  const formatNum = (val: number, decimals = 2) => {
    return val.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const barcodeValue = details.barcodeText || details.receiptNumber.replace(/-/g, ' ');

  return (
    <div
      ref={receiptRef}
      className="w-[330px] sm:w-[350px] bg-white text-black p-4 sm:p-5 select-none font-mono text-[11px] leading-[1.35] tracking-tight border border-gray-300 shadow-xl"
      style={{
        fontFamily: '"Courier New", Courier, "Lucida Console", Monaco, monospace',
        backgroundColor: '#ffffff',
        color: '#111111',
      }}
    >
      {/* 1. SPAR LOGO */}
      <div className="pt-2 pb-2 text-center">
        <SparLogo variant={logoVariant} size={36} />
      </div>

      {/* 2. STORE HEADER */}
      <div className="text-center space-y-0.5 mt-1">
        <p className="font-bold text-[13px] tracking-wider">{details.storeName}</p>
        <p className="text-[11px]">{details.storeAddress}</p>
        <p className="text-[11px]">{details.country}</p>
        <div className="text-[10px] text-gray-800 flex justify-between items-center px-1 pt-0.5">
          <span>Hotline no: {details.hotline}</span>
          <span>({details.operatingHours})</span>
        </div>
      </div>

      {/* 3. SALES INVOICE TITLE */}
      <div className="text-center my-3">
        <p className="font-bold text-[13px] tracking-[0.25em] uppercase">
          {details.invoiceTitle || "SALES  INVOICE"}
        </p>
      </div>

      {/* 4. METADATA HEADER */}
      <div className="border-t border-b border-dashed border-gray-400 py-1.5 my-1 text-[10px]">
        <div className="grid grid-cols-5 text-gray-700 font-semibold mb-0.5">
          <span className="col-span-2">Receipt No:</span>
          <span>Till No</span>
          <span>Cashier</span>
          <span className="text-right">Date / Time</span>
        </div>
        <div className="grid grid-cols-5 font-bold text-black items-center">
          <span className="col-span-2 text-[9.5px] truncate pr-1" title={details.receiptNumber}>
            {details.receiptNumber}
          </span>
          <span>{details.tillNumber}</span>
          <span>{details.cashierNumber}</span>
          <div className="text-right text-[9.5px] leading-tight">
            <div>{details.receiptDate}</div>
            <div>{details.receiptTime}</div>
          </div>
        </div>
      </div>

      {/* 5. ITEMS TABLE HEADER */}
      <div className="mt-2.5 mb-1 pb-1 border-b border-dashed border-gray-400 text-[10px] font-bold">
        <div className="flex justify-between items-center">
          <span className="w-[38%]">ITEM</span>
          <span className="w-[14%] text-center">UNIT</span>
          <span className="w-[14%] text-center">QTY</span>
          <span className="w-[18%] text-right">Unit Price</span>
          <span className="w-[16%] text-right">TOTAL</span>
        </div>
      </div>

      {/* 6. ITEMS LIST */}
      <div className="space-y-1.5 my-2">
        {items.map((item, index) => {
          const itemTotal = (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
          return (
            <div key={item.id || index} className="text-[10.5px]">
              {/* Line 1: Item Name and Tax category flag */}
              <div className="flex justify-between items-start">
                <span className="font-bold uppercase tracking-tight flex-1 pr-1 truncate">
                  {item.name}
                </span>
                <span className="font-bold text-[10px] ml-1">{item.taxCat || 'A'}</span>
              </div>
              {/* Line 2: Barcode / SKU + Unit + Qty + Unit Price + Total */}
              <div className="flex justify-between items-center text-[10px] text-gray-900 mt-0.5">
                <span className="w-[38%] text-[9px] text-gray-700 tracking-tighter truncate font-mono">
                  {item.barcode}
                </span>
                <span className="w-[14%] text-center uppercase text-[9.5px]">{item.unit}</span>
                <span className="w-[14%] text-center font-mono">
                  {Number.isInteger(Number(item.qty)) ? item.qty : Number(item.qty).toFixed(2)}
                </span>
                <span className="w-[18%] text-right font-mono">
                  {formatNum(Number(item.unitPrice) || 0)}
                </span>
                <span className="w-[16%] text-right font-bold font-mono">
                  {formatNum(itemTotal)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 7. TOTALS SECTION */}
      <div className="border-t border-dashed border-gray-400 pt-2 mt-2 space-y-1 text-[11px]">
        <div className="flex justify-between">
          <span className="text-gray-700">Total Quantity</span>
          <span className="font-bold font-mono">
            {Number.isInteger(totalQuantity) ? totalQuantity : totalQuantity.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between text-[12px] font-bold">
          <span>Total (NGN)</span>
          <span className="font-mono text-[13px]">{formatNum(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="capitalize">{details.paymentMethod}</span>
          <span className="font-mono font-semibold">{formatNum(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-[10.5px] text-gray-600">
          <span>Rounding :</span>
          <span className="font-mono">{formatNum(Number(details.rounding) || 0)}</span>
        </div>
      </div>

      {/* 8. VAT ANALYSIS TABLE */}
      <div className="border-t border-b border-dashed border-gray-400 py-1.5 my-2.5 text-[9.5px]">
        <div className="flex justify-between font-bold text-gray-700 pb-0.5 border-b border-gray-200">
          <span className="w-[15%]">Vat Rate</span>
          <span className="w-[22%] text-right">Exl of Tax</span>
          <span className="w-[20%] text-right">Tax Amount</span>
          <span className="w-[22%] text-right">Inc of Tax</span>
          <span className="w-[21%] text-right">Total Qty</span>
        </div>
        {/* Row 0.00% exempt */}
        <div className="flex justify-between text-gray-600 mt-0.5 font-mono">
          <span className="w-[15%]">0.00%</span>
          <span className="w-[22%] text-right">0.00</span>
          <span className="w-[20%] text-right">0.00</span>
          <span className="w-[22%] text-right">0.00</span>
          <span className="w-[21%] text-right">0.00*</span>
        </div>
        {/* Row 7.5% active */}
        <div className="flex justify-between text-black font-semibold mt-0.5 font-mono">
          <span className="w-[15%]">7.5%</span>
          <span className="w-[22%] text-right">{formatNum(exclOfTax)}</span>
          <span className="w-[20%] text-right">{formatNum(taxAmount)}</span>
          <span className="w-[22%] text-right">{formatNum(totalAmount)}</span>
          <span className="w-[21%] text-right">
            {Number.isInteger(totalQuantity) ? totalQuantity : totalQuantity.toFixed(2)}A
          </span>
        </div>
      </div>

      {/* 9. REFUND POLICY & MACHINE INFO */}
      <div className="text-center space-y-1 my-2 text-[10px] text-gray-800">
        <p className="font-bold tracking-wider uppercase text-[11px] text-black">
          {details.refundPolicy ? "REFUND POLICY" : ""}
        </p>
        <p className="text-[9.5px]">{details.refundPolicy}</p>
        <div className="pt-1 text-[9.5px] space-y-0.5">
          <p>Allee DotNo: {details.machineNo}</p>
          <p className="font-bold">VAT:   {details.vatNumber}</p>
        </div>
        <p className="pt-1 font-semibold text-black">{details.thankYouMessage}</p>
        <p className="text-[9px] text-gray-700">Email us at {details.feedbackEmail}</p>
      </div>

      {/* 10. BARCODE AT BOTTOM */}
      <div className="pt-2 pb-1 text-center border-t border-dashed border-gray-300">
        <Barcode value={barcodeValue} height={40} barWidth={1.4} />
        <p className="font-mono text-[10px] tracking-[0.15em] font-semibold mt-1">
          {barcodeValue}
        </p>
      </div>
    </div>
  );
};

export default SparReceipt;
