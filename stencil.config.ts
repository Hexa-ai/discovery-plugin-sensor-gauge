import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'discovery-plugin-sensor-gauge',
  globalScript: './src/plugin.ts',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'dist',
      copy: [
        { src: 'images' }
      ]
    }
  ],
};
