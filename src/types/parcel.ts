export type ParcelStatus =
  | 'ACTIVE'
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'TRANSFERRED'
  | 'REJECTED_DUPLICATE';

export interface Parcel {
  id: string;
  parcelUid: string;
  address: string;
  district: string;
  city: string;
  status: ParcelStatus;
  currentOwnerName: string;
  currentOwnerIdentifier?: string | null;
  geometry?: unknown;
  txHash?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ParcelHistoryItem {
  id: string;
  parcelId: string;
  actionType: string;
  previousOwner?: string | null;
  newOwner?: string | null;
  performedBy?: string | null;
  details?: string | null;
  txHash?: string | null;
  createdAt: string;
}
