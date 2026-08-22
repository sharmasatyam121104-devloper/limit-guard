import axios from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  code?: string;
  message?: string;
  error?: string;
}

const clientCatchError = (error: unknown): void => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const errorCode = error.response?.data?.code;

    // Auth errors ko toast mat dikhao
    if (
      errorCode === "AUTH_TOKEN_INVALID" ||
      errorCode === "AUTH_TOKEN_MISSING"
    ) {
      return;
    }

    const serverMessage =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.response?.statusText ??
      "Server error";

    toast.error(serverMessage);
    return;
  }

  // Native JS Error
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  // Fallback
  toast.error("Internal server error");
};

export default clientCatchError;