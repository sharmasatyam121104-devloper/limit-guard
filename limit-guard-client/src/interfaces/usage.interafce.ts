export interface UsageDataItem {
  endpointName: string;
  status: 'Success' | 'Failed' | string;
  statusCode: number;
  latency: number | null;
}

export interface UsageDataResponseInterface {
  data: UsageDataItem[];
}

export interface TopEndpointDataInterface {
  path: string;
  count: number;
  data: {
    status: string;
    statusCode: number;
    latency: number;
  }[];
}