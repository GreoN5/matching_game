"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-md shadow-md max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">
          Oops! Something went wrong.
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {error.message || "An unexpected error has occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
