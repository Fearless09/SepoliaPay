export interface TransactionType {
  id?: number;
  url?: string;
  message: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
  keyword?: string
}
