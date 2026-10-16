import { describe, expect, test } from 'bun:test';
import { FOOTER_LINKS } from './footer-navigation.ts';

describe('footer destinations', () => {
  test('Company does not link to Contact or repeat the service lines', () => {
    const company = FOOTER_LINKS.find(group => group.heading === 'Company');
    expect(company).toBeDefined();
    expect(company.items.some(item => item.to === '/contact')).toBe(false);
    expect(company.items.map(item => item.label)).toEqual(['Products', 'Projects', 'About']);
  });
  test('Services links to land, marine projects and engineering advisory', () => {
    expect(FOOTER_LINKS.find(group => group.heading === 'Services')?.items.map(item => item.to)).toEqual(['/land-based', '/projects', '/advisory']);
  });
  test('Connect contains only contact and quote destinations', () => {
    expect(FOOTER_LINKS.find(group => group.heading === 'Connect')?.items.map(item => item.to)).toEqual(['/contact', '/enquire']);
  });
  test('no footer destination opens the removed Solutions overview', () => {
    expect(FOOTER_LINKS.flatMap(group => group.items).some(item => item.to === '/solutions')).toBe(false);
  });
});