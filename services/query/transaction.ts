import { TransactionHistoryParams } from '@/services/api/types/wallet';
import { getWalletTransactionHistoryApi } from '@/services/api/wallet';
import QUERIES_KEY from '@/services/query/query-keys';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface Pagination {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_transactions: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface Transaction {
  transaction_id: string;
  type: string;
  transaction_type: 'credit' | 'debit';
  title: string;
  location: string;
  points: number;
  amount: number;
  transaction_amount?: number | null;
  travlounge_percentage?: number | null;
  date: string;
  time: string;
  date_display: string;
  source?: string;
  reason?: string;
  reference_id?: string | null;
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
  pagination: Pagination;
  period: string;
}

const getTransactionHistoryQuery = (params?: TransactionHistoryParams) =>
  useInfiniteQuery<TransactionHistoryResponse>({
    queryFn: ({ pageParam = 1 }) =>
      getWalletTransactionHistoryApi({ ...params, page: pageParam as number }),
    queryKey: [QUERIES_KEY.ELITE_TRANSACTION_HISTORY, params],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.has_next ? lastPage.pagination.current_page + 1 : undefined;
    },
  });

export { getTransactionHistoryQuery };
