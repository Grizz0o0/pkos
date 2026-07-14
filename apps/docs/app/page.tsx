import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PKOS Developer Documentation",
};

const sections = [
  {
    title: "API Reference",
    description:
      "REST API endpoints, request/response schemas, and authentication.",
    icon: "📡",
    status: "Coming soon",
  },
  {
    title: "Architecture",
    description: "System design, data flow, and infrastructure overview.",
    icon: "🏗️",
    status: "Coming soon",
  },
  {
    title: "ADR",
    description:
      "Architecture Decision Records — why we made the choices we made.",
    icon: "📋",
    status: "Coming soon",
  },
  {
    title: "Developer Guide",
    description: "Setup, contributing guidelines, and development workflow.",
    icon: "🛠️",
    status: "Coming soon",
  },
  {
    title: "Roadmap",
    description: "Planned features, milestones, and release schedule.",
    icon: "🗺️",
    status: "Coming soon",
  },
];

export default function DocsHome() {
  return (
    <main
      style={{
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#0f172a",
          }}
        >
          PKOS Documentation
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Developer documentation for the Personal Knowledge Operating System.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        {sections.map((section) => (
          <div
            key={section.title}
            style={{
              padding: "1.5rem",
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{section.icon}</span>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.25rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {section.title}
                </h2>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    padding: "0.15rem 0.5rem",
                    background: "#f1f5f9",
                    color: "#64748b",
                    borderRadius: "9999px",
                  }}
                >
                  {section.status}
                </span>
              </div>
              <p style={{ color: "#64748b", margin: 0, fontSize: "0.9rem" }}>
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: "3rem",
          color: "#94a3b8",
          fontSize: "0.875rem",
          textAlign: "center",
        }}
      >
        PKOS Docs — running on port 3001
      </p>
    </main>
  );
}
