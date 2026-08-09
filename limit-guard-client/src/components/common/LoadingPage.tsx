import { useEffect, useState } from "react";
import {
  Check,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Logo from "../../components/common/Logo";

interface LoadingPageProps {
  message?: string;
  subMessage?: string;
  onRetry?: () => void;
  steps?: string[];
}

const DEFAULT_STEPS = [
  "Verifying secure session...",
  "Loading workspace preferences...",
  "Fetching your workspace data...",
  "Almost ready...",
];

const LoadingPage = ({
  message = "Loading your workspace...",
  subMessage = "We're gathering your data and setting things up. This will only take a moment.",
  onRetry,
  steps = DEFAULT_STEPS,
}: LoadingPageProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const hasSteps = steps.length > 0;
  const currentStep = hasSteps
    ? steps[currentStepIndex]
    : "Preparing your workspace...";

  const progress = hasSteps
    ? ((currentStepIndex + 1) / steps.length) * 100
    : 0;

  useEffect(() => {
    if (!hasSteps) return;

    const interval = window.setInterval(() => {
      setCurrentStepIndex((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 1400);

    return () => window.clearInterval(interval);
  }, [steps.length, hasSteps]);

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-10"
      aria-busy="true"
      aria-live="polite"
    >
      {/* ================= Background ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Glow */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />

        {/* Bottom Right Glow */}
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-[120px]" />

        {/* Center Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.045),transparent_45%)]" />

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.025] [background-image: linear-gradient(#4f46e5 1px,transparent 1px),linear-gradient(90deg,#4f46e5 1px,transparent 1px)] [bg-size:40px_40px]" />
      </div>

      {/* ================= Main Content ================= */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="mb-7 flex justify-center transition-opacity duration-500 hover:opacity-90">
          <Logo />
        </div>

        {/* ================= Loading Card ================= */}
        <section className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/85 p-8 text-center shadow-2xl shadow-indigo-100/50 backdrop-blur-xl transition-all duration-300 md:p-10">

          {/* Card Glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          {/* ================= Loader ================= */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">

            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-2xl border border-indigo-100 bg-indigo-50/40" />

            {/* Rotating Ring */}
            <div className="absolute inset-0 rounded-2xl border-t-2 border-r-2 border-indigo-600 animate-spin" />

            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-xl bg-indigo-50 shadow-[0_0_35px_rgba(79,70,229,0.15)]" />

            {/* Loader Icon */}
            <Loader2
              className="relative z-10 h-9 w-9 animate-spin text-indigo-600"
              aria-hidden="true"
            />
          </div>

          {/* ================= Title ================= */}
          <h1 className="relative mt-8 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {message}
          </h1>

          {/* ================= Description ================= */}
          <p className="relative mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
            {subMessage}
          </p>

          {/* ================= Current Step ================= */}
          <div
            className="mt-7 flex min-h-6 items-center justify-center gap-2 text-xs font-medium text-indigo-600"
            key={currentStep}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>

            <span className="animate-[fadeIn_0.4s_ease-out]">
              {currentStep}
            </span>
          </div>

          {/* ================= Progress ================= */}
          <div
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="relative h-full rounded-full bg-linear-to-r from-indigo-500 via-cyan-400 to-indigo-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Moving Highlight */}
              <div className="absolute inset-0 w-1/3 animate-[shimmer_1.5s_linear_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* ================= Step Indicators ================= */}
          {hasSteps && (
            <div className="mt-4 flex justify-center gap-1.5">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index <= currentStepIndex
                      ? "w-5 bg-indigo-500"
                      : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}

          {/* ================= Secure Badge ================= */}
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
            <ShieldCheck
              size={14}
              className="text-indigo-600"
            />
            <span>Secure session</span>
          </div>

          {/* ================= Retry ================= */}
          {onRetry && (
            <div className="mt-6 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={onRetry}
                className="group inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
              >
                <RefreshCw
                  size={13}
                  className="transition-transform duration-300 group-hover:-rotate-45"
                />

                <span>Taking longer than expected? Retry</span>
              </button>
            </div>
          )}
        </section>

        {/* ================= Footer ================= */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <Check size={13} className="text-indigo-500" />
          <span>© 2026 LimitGuard. All rights reserved.</span>
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;