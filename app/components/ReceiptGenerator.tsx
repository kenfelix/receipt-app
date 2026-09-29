"use client";

import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { ReceiptTemplateType, ThePlaceDetails, ThePlaceItem, SparDetails, SparItem } from '../types/receipt';
import {
  defaultThePlaceDetails,
  defaultThePlaceItems,
  defaultSparDetails,
  defaultSparItems,
} from '../utils/receiptPresets';
import ThePlaceReceipt from './templates/ThePlaceReceipt';
import SparReceipt from './templates/SparReceipt';
import ThePlaceForm from './forms/ThePlaceForm';
import SparForm from './forms/SparForm';

export default function ReceiptGenerator() {
  const [activeTemplate, setActiveTemplate] = useState<ReceiptTemplateType>('spar');
  const [isDownloading, setIsDownloading] = useState(false);

  // The Place State
  const [thePlaceDetails, setThePlaceDetails] = useState<ThePlaceDetails>(defaultThePlaceDetails);
  const [thePlaceItems, setThePlaceItems] = useState<ThePlaceItem[]>(defaultThePlaceItems);

  // SPAR State
  const [sparDetails, setSparDetails] = useState<SparDetails>(defaultSparDetails);
  const [sparItems, setSparItems] = useState<SparItem[]>(defaultSparItems);
  const [sparLogoVariant, setSparLogoVariant] = useState<'thermal' | 'color'>('thermal');

  // Ref to the active receipt DOM element for html-to-image capture
  const receiptRef = useRef<HTMLDivElement | null>(null);

  // Reset helpers
  const handleResetThePlace = () => {
    if (confirm("Reset The Place details to default preset?")) {
      setThePlaceDetails(defaultThePlaceDetails);
      setThePlaceItems(defaultThePlaceItems);
    }
  };

  const handleResetSpar = () => {
    if (confirm("Reset SPAR details to reference receipt preset?")) {
      setSparDetails(defaultSparDetails);
      setSparItems(defaultSparItems);
    }
  };

  // Image Download handler
  const handleDownload = async () => {
    const node = receiptRef.current;
    if (!node) return;

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(node, {
        skipFonts: true,
        cacheBust: true,
        pixelRatio: 3, // Ultra-sharp 3x resolution for thermal print simulation
        backgroundColor: '#ffffff',
      });

      const receiptNumber =
        activeTemplate === 'spar'
          ? sparDetails.receiptNumber
          : thePlaceDetails.receiptNumber;

      const filename = `${activeTemplate}-receipt-${receiptNumber || Date.now()}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating receipt image:', err);
      alert('Failed to generate image. Please check the browser console.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Application Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              🧾
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">Receipt Generator</h1>
              <p className="text-xs text-slate-500">Create authentic thermal POS receipts & invoices</p>
            </div>
          </div>

          {/* Template Selection Tabs */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTemplate('spar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTemplate === 'spar'
                  ? 'bg-white text-red-600 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              SPAR Supermarket
              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium">
                New ✨
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTemplate('theplace')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTemplate === 'theplace'
                  ? 'bg-white text-amber-700 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              The Place Restaurant
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Form Editor Panel */}
        <section className="w-full lg:w-7/12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>📝 Receipt Editor</span>
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold uppercase bg-slate-100 text-slate-600">
                  {activeTemplate === 'spar' ? 'SPAR POS Template' : 'The Place Template'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Customize every line, item, pricing, and tax information in real-time.
              </p>
            </div>
          </div>

          {activeTemplate === 'spar' ? (
            <SparForm
              details={sparDetails}
              items={sparItems}
              setDetails={setSparDetails}
              setItems={setSparItems}
              logoVariant={sparLogoVariant}
              setLogoVariant={setSparLogoVariant}
              onResetDefault={handleResetSpar}
            />
          ) : (
            <ThePlaceForm
              details={thePlaceDetails}
              items={thePlaceItems}
              setDetails={setThePlaceDetails}
              setItems={setThePlaceItems}
              onResetDefault={handleResetThePlace}
            />
          )}
        </section>

        {/* Right Side: Live Receipt Preview & Actions */}
        <aside className="w-full lg:w-5/12 lg:sticky lg:top-24 flex flex-col items-center">
          {/* Action Toolbar */}
          <div className="w-full max-w-[360px] mb-4 flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Thermal Preview
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md transition transform active:scale-95"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <span>📸 Download PNG</span>
                </>
              )}
            </button>
          </div>

          {/* Receipt Canvas Container */}
          <div className="w-full flex items-center justify-center p-3 sm:p-6 bg-slate-200/70 rounded-2xl border border-dashed border-slate-300">
            {activeTemplate === 'spar' ? (
              <SparReceipt
                details={sparDetails}
                items={sparItems}
                receiptRef={receiptRef}
                logoVariant={sparLogoVariant}
              />
            ) : (
              <ThePlaceReceipt
                details={thePlaceDetails}
                items={thePlaceItems}
                receiptRef={receiptRef}
              />
            )}
          </div>

          {/* Help & Print Info */}
          <div className="w-full max-w-[360px] mt-4 text-center text-xs text-slate-500 space-y-1">
            <p>
              💡 Formatted to standard <strong>80mm thermal receipt roll</strong> scale.
            </p>
            <p className="text-[11px] text-slate-400">
              Downloaded image is high-resolution (3x) ready for digital archiving or printing.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
