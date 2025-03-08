export interface TransactionType {
  id?: number;
  url?: string;
  message: string;
  timestamp: string;
  addressFrom: string;
  amount: string;
  addressTo: string;
  keyword?: string;
}

export interface TransactionDataType {
  receiver: string;
  message: string;
  amount: number;
  keyword: string;
}
