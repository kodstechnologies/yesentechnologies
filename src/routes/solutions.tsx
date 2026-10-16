import { createFileRoute, redirect } from '@tanstack/react-router';

// Retired overview: preserve existing bookmarks without rendering a Solutions page.
export const Route = createFileRoute('/solutions')({
  beforeLoad: () => {
    throw redirect({ to: '/', statusCode: 301 });
  },
});
