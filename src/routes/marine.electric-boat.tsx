import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/marine/electric-boat")({ beforeLoad: () => { throw redirect({ to: "/marine/greenfield/electric-boat", statusCode: 301 }); } });
