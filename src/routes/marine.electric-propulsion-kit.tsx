import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/marine/electric-propulsion-kit")({ beforeLoad: () => { throw redirect({ to: "/marine/greenfield/electric-propulsion-kit", statusCode: 301 }); } });
