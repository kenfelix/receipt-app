export type ReceiptTemplateType = 'theplace' | 'spar';

// --- The Place Types ---
export interface ThePlaceItem {
  name: string;
  unit: string;
  qty: number;
  amount: number;
}

export interface ThePlaceDetails {
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

// --- SPAR Types ---
export interface SparItem {
  id: string;
  name: string;
  barcode: string;
  unit: string;
  qty: number;
  unitPrice: number;
  taxCat: string;
}

export interface SparDetails {
  storeName: string;
  storeAddress: string;
  country: string;
  hotline: string;
  operatingHours: string;
  invoiceTitle: string;
  receiptNumber: string;
  tillNumber: string;
  cashierNumber: string;
  receiptDate: string;
  receiptTime: string;
  paymentMethod: string;
  rounding: number;
  refundPolicy: string;
  machineNo: string;
  vatNumber: string;
  thankYouMessage: string;
  feedbackEmail: string;
  barcodeText: string;
}
