import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/marine/solar-electric-boat")({ beforeLoad: () => { throw redirect({ to: "/marine/greenfield/solar-electric-boat", statusCode: 301 }); } });
