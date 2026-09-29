import { ThePlaceDetails, ThePlaceItem, SparDetails, SparItem } from '../types/receipt';

export const defaultThePlaceDetails: ThePlaceDetails = {
  storeName: "The Place Restaurant Alausa Lagos.",
  storeAddress: "customerservice@theplace.com.ng",
  receiptNumber: "1058961",
  receiptDate: "2025-08-17",
  time: "23:56",
  cusNo: "",
  cashierName: "Julius Angela",
  cashierPhone: "0903-0175-869",
  orderType: "Take-Away",
  remark: "",
  paymentType: "TRANSFER",
  transferRef: "#979575",
};

export const defaultThePlaceItems: ThePlaceItem[] = [
  { name: "Branded pack", unit: "Pcs", qty: 2, amount: 1200.00 },
  { name: "Asun Pepper Rice. REGULAR", unit: "1", qty: 1, amount: 4500.00 },
  { name: "Asun Pepper Rice. LARGE P", unit: "1", qty: 1, amount: 6700.00 },
  { name: "Special fried rice LARGE P", unit: "1", qty: 1, amount: 4700.00 },
  { name: "Barbeque Chicken", unit: "Pcs", qty: 2, amount: 3800.00 },
  { name: "Eva Water (75cl)", unit: "Pcs", qty: 2, amount: 800.00 },
];

export const defaultSparDetails: SparDetails = {
  storeName: "SPAR AU",
  storeAddress: "Guru Plaza, Lagos",
  country: "NGA",
  hotline: "070 8065 3800",
  operatingHours: "9am-9pm | Mon-Sun",
  invoiceTitle: "SALES  INVOICE",
  receiptNumber: "AU-011218092616075",
  tillNumber: "AU0612",
  cashierNumber: "500060",
  receiptDate: "9/18/2026",
  receiptTime: "07:12 PM",
  paymentMethod: "BankTransfer",
  rounding: 0.00,
  refundPolicy: "No Guarantee, No Exchange, No Refund",
  machineNo: "00591493 C001",
  vatNumber: "12080023557",
  thankYouMessage: "Thank you for shopping at SPAR",
  feedbackEmail: "feedback@sparnigeria.com",
  barcodeText: "AU 011218092616075",
};

export const defaultSparItems: SparItem[] = [
  {
    id: "1",
    name: "NIGERIAN CUISINE EBA-GARRI",
    barcode: "2007094002350",
    unit: "KGS",
    qty: 0.23,
    unitPrice: 1450.00,
    taxCat: "A",
  },
  {
    id: "2",
    name: "CHICKEN STEW",
    barcode: "2007001002557",
    unit: "KGS",
    qty: 0.25,
    unitPrice: 9950.00,
    taxCat: "A",
  },
  {
    id: "3",
    name: "BITTER LEAF SOUP",
    barcode: "2007300004755",
    unit: "KGS",
    qty: 0.47,
    unitPrice: 11050.00,
    taxCat: "A",
  },
  {
    id: "4",
    name: "EXOTICA 2000 BANANA 50 CL",
    barcode: "751946860044",
    unit: "1X1",
    qty: 1,
    unitPrice: 1250.00,
    taxCat: "A",
  },
];
