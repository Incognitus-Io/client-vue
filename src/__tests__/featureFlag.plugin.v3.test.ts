import { createApp } from 'vue3';
import { IncognitusService } from '@incognitus/client-web-core';
import fetchMock from 'jest-fetch-mock';

import { incognitusSymbol } from '../constants';
import { IncognitusVue3 } from '../featureFlag.plugin.v3';

describe('Plugin Vue3', () => {
  const defaultConfig = {
    tenantId: 'abc',
    applicationId: 'xyz',
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(async () => ({
      body: JSON.stringify({ Features: [] }),
    }));
  });

  describe('plugin', () => {
    it('includes an install method', () => {
      expect(IncognitusVue3.install).toBeDefined();
    });

    describe('install', () => {
      const comp = {
        template: '<div></div>',
      };

      it('initializes the service', async () => {
        const vue = createApp(comp);

        expect(IncognitusService.isReady).toBe(false);

        await IncognitusVue3.install(vue, defaultConfig);

        expect(IncognitusService.isReady).toBe(true);
      });

      it('adds the directive', async () => {
        const vue = createApp(comp);
        await IncognitusVue3.install(vue, defaultConfig);

        expect(vue._context.directives['feature-flag']).toBeDefined();
      });

      it('adds the injector', async () => {
        const vue = createApp(comp);
        await IncognitusVue3.install(vue, defaultConfig);

        expect(Object.getOwnPropertySymbols(vue._context.provides)).toContain(
          incognitusSymbol,
        );
      });
    });
  });
});
