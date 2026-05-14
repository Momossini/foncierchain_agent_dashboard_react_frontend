import { useQuery } from '@tanstack/react-query';

export interface BlockchainTransaction {
  hash: string;
  action: 'TRANSFER' | 'CREATION';
  parcelUid: string;
  block: string;
  status: 'CONFIRMED' | 'PENDING';
  timestamp: string;
}

const MOCK_TRANSACTIONS: BlockchainTransaction[] = [
  { hash: '0x3a4b...f12c', action: 'TRANSFER', parcelUid: 'DEMO-123', block: '458,291', status: 'CONFIRMED', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
  { hash: '0x7e8d...a9b2', action: 'CREATION', parcelUid: 'PARIS-09-01', block: '458,285', status: 'CONFIRMED', timestamp: new Date(Date.now() - 12 * 60000).toISOString() },
  { hash: '0x1c2f...e5d4', action: 'TRANSFER', parcelUid: 'LYON-03-42', block: '458,278', status: 'CONFIRMED', timestamp: new Date(Date.now() - 45 * 60000).toISOString() },
];

export const useBlockchainTransactions = () => {
  return useQuery({
    queryKey: ['blockchain', 'transactions'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_TRANSACTIONS;
    },
  });
};
