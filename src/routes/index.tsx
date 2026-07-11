import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlayStation 4 — One of the Greatest Consoles Ever Made" },
      { name: "description", content: "An interactive tribute to the PlayStation 4: features, models, top games, timeline, quiz and fun facts." },
      { property: "og:title", content: "PlayStation 4 — One of the Greatest Consoles Ever Made" },
      { property: "og:description", content: "An interactive tribute to the PlayStation 4: features, models, top games, timeline, quiz and fun facts." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/ps4/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#05060a", color: "#eaf1ff", display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
      <p>Loading PlayStation 4…</p>
    </div>
  );
}
