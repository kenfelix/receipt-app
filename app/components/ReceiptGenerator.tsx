"use client"

import React, { useState, useRef, useEffect } from 'react';
import { formatCurrency } from '../utils/currencyFormatter'; // Import the utility function
import { toPng } from 'html-to-image';

// Define interfaces for the data structures
interface Item {
  name: string;
  unit: string;
  qty: number;
  amount: number;
}

interface ReceiptDetails {
  storeName: string;
  storeAddress: string;
  receiptNumber: string;
  receiptDate: string;
  time: string;
  cusNo: string;
  cashierName: string;
  cashierPhone: string;
  orderType: string;
  remark: string;
  paymentType: string;
  transferRef: string;
}

declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: object) => Promise<HTMLCanvasElement>;
  }
}


// Main App component which acts as the receipt generator
export default function ReceiptGenerator() {
  // useRef hook to create a reference to the receipt preview div.
  // This ref will be used by html2canvas to capture the receipt's content.
  const receiptRef = useRef<HTMLDivElement | null>(null);
 // Specify the type of element the ref will hold

  // State to hold the static details of the receipt (store info, cashier, etc.)
  // Use the ReceiptDetails interface for type safety
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails>({
    storeName: "The Place Restaurant Alausa Lagos.",
    storeAddress: "customerservice@theplace.com.ng",
    receiptNumber: "1058961",
    receiptDate: "2025-08-17", // Changed to YYYY-MM-DD format for date input compatibility
    time: "23:56", // Changed to HH:MM for time input compatibility
    cusNo: "",
    cashierName: "Julius Angela",
    cashierPhone: "0903-0175-869",
    orderType: "Take-Away",
    remark: "",
    paymentType: "TRANSFER",
    transferRef: "#979575",
  });

  // State to hold the dynamic list of items on the receipt
  // Use the Item interface for type safety in the array
  const [items, setItems] = useState<Item[]>([
    { name: "Branded pack", unit: "Pcs", qty: 2, amount: 1200.00 },
    { name: "Asun Pepper Rice. REGULAR", unit: "1", qty: 1, amount: 4500.00 },
    { name: "Asun Pepper Rice. LARGE P", unit: "1", qty: 1, amount: 6700.00 },
    { name: "Special fried rice LARGE P", unit: "1", qty: 1, amount: 4700.00 },
    { name: "Barbeque Chicken", unit: "Pcs", qty: 2, amount: 3800.00 },
    { name: "Eva Water (75cl)", unit: "Pcs", qty: 2, amount: 800.00 },
  ]);

  // Calculate subtotal dynamically based on current items
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.amount), 0);
  const totalAmount = subtotal; // In this example, total is same as subtotal

  // Handler for changes in the main receipt details inputs
  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReceiptDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handler for changes in individual item properties
  const handleItemChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newItems = [...items]; // Create a mutable copy of the items array
    newItems[index] = {
      ...newItems[index],
      [name]: type === 'number' ? parseFloat(value) : value // Parse numbers for numeric inputs
    };
    setItems(newItems); // Update the state with the modified items
  };

  // Function to add a new blank item row to the list
  const addItem = () => {
    setItems([...items, { name: "", unit: "", qty: 1, amount: 0 }]);
  };

  // Function to remove an item row by its index
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index); // Filter out the item at the given index
    setItems(newItems);
  };

  // Function to download the receipt as a PNG image
  const downloadReceiptAsImage = () => {
    const node = receiptRef.current;

    if (!node) return;

    toPng(node, {
      skipFonts: true,       // ✅ Avoid cross-origin font access issues
      cacheBust: true,       // ✅ Avoid stale images
      pixelRatio: 2,         // ✅ Higher resolution (like html2canvas scale: 2)
      backgroundColor: '#ffffff' // ✅ Set a background if your component is transparent
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `receipt-${receiptDetails.receiptNumber}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
        alert('There was an error generating the image. Check the console for details.');
      });
  };

  const generateRandomRefs = () => {
    const randomReceiptNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
    const randomTransferRef = `#${Math.floor(100000 + Math.random() * 900000)}`;
    
    setReceiptDetails(prevDetails => ({
      ...prevDetails,
      receiptNumber: randomReceiptNumber,
      transferRef: randomTransferRef
    }));
  };

  // useEffect to dynamically load the html2canvas script when the component mounts.
  // This ensures the library is available before the download function is called.
  useEffect(() => {
    // Only append the script if it hasn't been loaded already
    if (typeof window.html2canvas === 'undefined') {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.async = true; // Load script asynchronously
      document.body.appendChild(script);
    }
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 text-gray-500">
      {/* Left Section: Input Fields for editing receipt details */}
      <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-xl p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Receipt Details Editor 📝</h2>

        {/* Store Information Section */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Store Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 text-sm">Store Name:</span>
              <input
                type="text"
                name="storeName"
                value={receiptDetails.storeName}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Store Email/Address:</span>
              <input
                type="text"
                name="storeAddress"
                value={receiptDetails.storeAddress}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block relative">
              <span className="text-gray-700 text-sm">Receipt Number:</span>
              <input
                type="text"
                name="receiptNumber"
                value={receiptDetails.receiptNumber}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
              <button
                  type="button"
                  onClick={generateRandomRefs}
                  className="absolute right-2 top-9 text-gray-500 hover:text-blue-600 focus:outline-none"
                  title="Generate"
                >
                  🔄
                </button>
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Date:</span>
              <input
                type="date"
                name="receiptDate"
                value={receiptDetails.receiptDate}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Time:</span>
              <input
                type="time"
                name="time"
                value={receiptDetails.time}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Cashier Name:</span>
              <input
                type="text"
                name="cashierName"
                value={receiptDetails.cashierName}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Cashier Phone:</span>
              <input
                type="text"
                name="cashierPhone"
                value={receiptDetails.cashierPhone}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Order Type:</span>
              <select
                name="orderType"
                value={receiptDetails.orderType}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              >
                <option value="Take-Away">Take-Away</option>
                <option value="Dine-In">Dine-In</option>
                <option value="Delivery">Delivery</option>
              </select>
            </label>
          </div>
        </div>

        {/* Items Section */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Items 🛍️</h3>
          {/* Map through items state to render editable input fields for each item */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-3 items-end p-2 border border-gray-200 rounded-md bg-gray-50">
              <label className="block col-span-2">
                <span className="text-gray-700 text-xs">Item Name:</span>
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs">Unit:</span>
                <input
                  type="text"
                  name="unit"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs">Qty:</span>
                <input
                  type="number"
                  name="qty"
                  value={item.qty}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                  min="1"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 text-xs">Amount:</span>
                <input
                  type="number"
                  name="amount"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                  step="0.01" // Allow decimal amounts
                  min="0"
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="col-span-1 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-sm h-10 w-full shadow-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out font-semibold mt-4 shadow-md"
          >
            Add Item
          </button>
        </div>

        {/* Payment and Other Details Section */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Payment & Other Information 💳</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 text-sm">Payment Type:</span>
              <input
                type="text"
                name="paymentType"
                value={receiptDetails.paymentType}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
            </label>
            <label className="block relative">
              <span className="text-gray-700 text-sm">Transfer Reference:</span>
              <input
                type="text"
                name="transferRef"
                value={receiptDetails.transferRef}
                onChange={handleDetailChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
              />
                <button
                  type="button"
                  onClick={generateRandomRefs}
                  className="absolute right-2 top-9 text-gray-500 hover:text-blue-600 focus:outline-none"
                  title="Generate"
                >
                  🔄
                </button>
            </label>
          </div>
          <label className="block mt-4">
            <span className="text-gray-700 text-sm">Remark:</span>
            <textarea
              name="remark"
              value={receiptDetails.remark}
              onChange={handleDetailChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
            ></textarea>
          </label>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadReceiptAsImage}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out font-bold text-lg shadow-lg transform hover:scale-105"
        >
          Download Receipt as Image (PNG) 📸
        </button>
      </div>

      {/* Right Section: Receipt Live Preview */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-4">
        {/* The receipt preview container with a fixed width to simulate thermal paper */}
        <div ref={receiptRef} className="w-80 bg-white rounded-lg shadow-xl overflow-hidden font-mono text-xs sm:text-sm border border-gray-300 print-area">
          {/* Receipt Header Section */}
          <div className="p-4  mt-6 text-center border-b box-content border-gray-300">
            <p className="">{receiptDetails.storeName}</p>
            <p className="text-gray-700 leading-tight">{receiptDetails.storeAddress}</p>
          </div>

          {/* Receipt Details Section */}
          <div className="p-4 border-b border-gray-300">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Receipt #:</span>
              <span>{receiptDetails.receiptNumber}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Date:</span>
              <span>{receiptDetails.receiptDate}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Time:</span>
              <span>{receiptDetails.time}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Cashier Name:</span>
              <span>{receiptDetails.cashierName}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Phone No:</span>
              <span>{receiptDetails.cashierPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Order Type:</span>
              <span>{receiptDetails.orderType}</span>
            </div>
          </div>

          {/* Items Table Header */}
          <div className="p-4 pt-3 pb-2 border-b border-gray-300">
            <div className="grid grid-cols-4 font-bold text-gray-800">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Amount</span>
            </div>
          </div>

          {/* Items List */}
          <div className="p-4 py-2 border-b border-gray-300">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 text-gray-800 mb-1">
                <span className="col-span-2">{item.name}</span>
                <span className="text-center">{item.qty}</span>
                <span className="text-right">{formatCurrency(item.qty * item.amount)}</span>
              </div>
            ))}
          </div>

          {/* Subtotal and Total */}
          <div className="p-4 pt-2 pb-1 border-b border-gray-300">
            <div className="flex justify-between font-bold text-gray-900 text-base mb-1">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="text-center text-xs text-gray-600 mb-2">Settled</div>
            <div className="flex justify-between text-gray-800">
              <span className="font-bold uppercase">{receiptDetails.paymentType}</span>
              <span>{receiptDetails.transferRef}</span>
              <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </div>
          </div>

          {/* Footer Message */}
          <div className="p-4 text-center text-gray-700 text-xs leading-tight">
            <p className="mb-2 font-semibold">Thank You For Patronizing!!!</p>
            <p className="mb-1">For feedbacks and enquiries</p>
            <p>08182862824, 08183742775</p>
            <p className="mb-2">WhatsApp only - 07066742998</p>
            {receiptDetails.remark && <p className="mt-2 text-red-500 font-bold">Remark: {receiptDetails.remark}</p>}
          </div>

          {/* Bill Preparation Details (Mimicking printed text) */}
          <div className="p-4 pt-0 text-gray-600 text-[10px] sm:text-xs">
            <p>Bill Prepared By: {receiptDetails.cashierName}</p>
            <p>Bill Printed Time: {receiptDetails.time}</p>
            <p>Bill Settle By: {receiptDetails.cashierName}</p>
            <p>Payment Type: {receiptDetails.paymentType.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
