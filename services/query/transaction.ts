import { getWalletTransactionHistoryApi } from '@/services/api/wallet';
import QUERIES_KEY from '@/services/query/query-keys';
import { useQuery } from '@tanstack/react-query';

export interface Transaction {
  transaction_id: string;
  type: string;
  transaction_type: 'credit' | 'debit';
  title: string;
  location: string;
  points: number;
  amount: number;
  date: string;
  time: string;
  date_display: string;
  source?: string;
  reason?: string;
  reference_id?: string;
  balance_after?: number;
  order_number?: string;
  coins_earned?: number;
  status?: string;
}

export interface TransactionGroup {
  month: string;
  transactions: Transaction[];
}

export interface TransactionHistoryResponse {
  current_balance: number;
  transactions_by_month: TransactionGroup[];
  total_transactions: number;
  period: string;
}

const getTransactionHistoryQuery = () =>
  useQuery<TransactionHistoryResponse>({
    queryFn: getWalletTransactionHistoryApi,
    queryKey: [QUERIES_KEY.ELITE_TRANSACTION_HISTORY],
  });

export { getTransactionHistoryQuery };
