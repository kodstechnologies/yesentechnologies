import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/content/seo';
import { SolarServicePage } from '@/components/SolarServicePage';

export const Route = createFileRoute('/land-based/microgrid')({
  head: () => pageHead('/land-based/microgrid', 'Solar Microgrids | YESEN Technologies Pvt Ltd', 'Coordinated solar, storage and local networks with engineered control, protection, islanding and restoration strategies.'),
  component: () => <SolarServicePage service="microgrid" />,
});
