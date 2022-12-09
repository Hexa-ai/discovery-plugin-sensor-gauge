import { newSpecPage } from '@stencil/core/testing';
import { DiscoveryPluginSensorGauge } from '../discovery-plugin-sensor-gauge';

describe('discovery-plugin-sensor-gauge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DiscoveryPluginSensorGauge],
      html: `<discovery-plugin-sensor-gauge></discovery-plugin-sensor-gauge>`,
    });
    expect(page.root).toEqualHtml(`
      <discovery-plugin-sensor-gauge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </discovery-plugin-sensor-gauge>
    `);
  });
});
