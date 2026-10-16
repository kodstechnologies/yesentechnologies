import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/marine/vessel-retrofit")({ beforeLoad: () => { throw redirect({ to: "/marine/retrofit/vessel-retrofit", statusCode: 301 }); } });
