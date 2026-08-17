export interface ActivityLogDataItem {
  _id: string;
  type: string;
  message: string;
  status: 'success' | 'failed' | string;
  createdAt: number;
}

// Agar log items ki array milti hai:
export interface ActivityLogDataInterface {
  logs: ActivityLogDataItem[];
}