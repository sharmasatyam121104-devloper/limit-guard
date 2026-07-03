import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
          <ShieldAlert className="h-10 w-10 text-indigo-600" />
        </div>

        <h1 className="mt-8 text-6xl font-bold tracking-tight text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to your dashboard.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <ArrowLeft size={18} />
          Go to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;