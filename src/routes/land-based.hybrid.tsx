import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/content/seo';
import { SolarServicePage } from '@/components/SolarServicePage';

export const Route = createFileRoute('/land-based/hybrid')({
  head: () => pageHead('/land-based/hybrid', 'Hybrid Solar | YESEN Technologies Pvt Ltd', 'Solar, storage and grid integration with defined critical loads, battery reserves and safely isolated outage support.'),
  component: () => <SolarServicePage service="hybrid" />,
});
