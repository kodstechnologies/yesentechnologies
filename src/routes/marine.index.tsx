import { createFileRoute, redirect } from "@tanstack/react-router";

/* The E-MARINE overview page was removed. Old links and bookmarks keep working. */
export const Route = createFileRoute("/marine/")({
  beforeLoad: () => {
    throw redirect({ to: "/projects", statusCode: 301 });
  },
});
