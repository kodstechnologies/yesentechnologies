import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/content/seo';
import { SolarServicePage } from '@/components/SolarServicePage';

export const Route = createFileRoute('/land-based/grid-tie')({
  head: () => pageHead('/land-based/grid-tie', 'Grid Tie Solar | YESEN Technologies Pvt Ltd', 'Grid-connected solar designed around daytime demand, site conditions, utility interconnection and permitted export.'),
  component: () => <SolarServicePage service="grid-tie" />,
});
