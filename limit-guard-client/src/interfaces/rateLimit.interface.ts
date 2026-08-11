export interface RateLimitStatusDataInterface {
  status: string;         // Example: "Active"
  rateLimit: string;      // Example: "5 / minute"
  usedRequests: number;   // Example: 0
  remainingRequests: number; // Example: 5
  windowReset: string;    // Example: "0 sec"
}