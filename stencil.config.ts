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
      type: 'www',
      copy: [
        { src: 'assets', dest: 'build/assets',}
      ]
    },
    {
      type: 'dist-custom-elements',
      copy: [
        {
          src: 'assets',
          dest: 'dist/assets',
          warn: true,
        }
      ]
    },
  ],
};
