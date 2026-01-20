"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error("🔥 GLOBAL ERROR:", error);

  return (
    <div style={{ padding: 40 }}>
      <h2>Something went wrong 😢</h2>
      <p>{error.message}</p>

      <button onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
