"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { JSX } from "react";

const Result = (): JSX.Element => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams?.get("score") as string);

  const getMessage = () => {
    if (score >= 50) {
      return "Excellent! You're a geography whiz!";
    }

    if (score >= 30) {
      return "Good job!";
    }

    return "Better luck next time!";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Game Over</h1>
      <p className="text-2xl mb-4">Your final score: {score}</p>
      <p className="text-xl mb-8">{getMessage()}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900"
        onClick={() => router.push("/")}
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;
