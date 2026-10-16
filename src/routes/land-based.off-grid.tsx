import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/content/seo';
import { SolarServicePage } from '@/components/SolarServicePage';

export const Route = createFileRoute('/land-based/off-grid')({
  head: () => pageHead('/land-based/off-grid', 'Off Grid Solar | YESEN Technologies Pvt Ltd', 'Standalone solar and battery systems designed around seasonal generation, usable storage, essential loads and remote-site operation.'),
  component: () => <SolarServicePage service="off-grid" />,
});
