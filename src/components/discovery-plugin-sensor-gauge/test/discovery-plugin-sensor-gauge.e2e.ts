import { newE2EPage } from '@stencil/core/testing';

describe('discovery-plugin-sensor-gauge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<discovery-plugin-sensor-gauge></discovery-plugin-sensor-gauge>');

    const element = await page.find('discovery-plugin-sensor-gauge');
    expect(element).toHaveClass('hydrated');
  });
});
