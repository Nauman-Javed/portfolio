"use client";

// Last-resort fallback when the root layout itself fails. It replaces the whole
// document and gets none of the app's styles, so it styles itself inline.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090e11",
          color: "#eaf0f2",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <main>
          <title>Something went wrong</title>
          <h1 style={{ fontSize: 36, fontWeight: 400, margin: "0 0 12px" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#9aaeb5", margin: "0 0 24px" }}>
            The site couldn’t be loaded. Please try again.
          </p>
          {error.digest && (
            <p style={{ color: "#78939e", fontSize: 12, margin: "0 0 24px" }}>
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={() => retry()}
            style={{
              height: 48,
              padding: "0 22px",
              border: 0,
              borderRadius: 6,
              background: "#26d1bf",
              color: "#06251f",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
