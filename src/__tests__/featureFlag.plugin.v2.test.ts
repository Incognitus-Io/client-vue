// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../typings/vue.d.ts" />

import { ComponentOptions } from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';
import { IncognitusService } from '@incognitus/client-web-core';
import fetchMock from 'jest-fetch-mock';

import { incognitusSymbol } from '../constants';
import { IncognitusVue2, injectIncognitus } from '../featureFlag.plugin.v2';

interface VueInstance {
  sealedOptions: ComponentOptions<Vue>;
}

describe('Plugin Vue2', () => {
  const defaultConfig = {
    tenantId: 'abc',
    applicationId: 'xyz',
  };

  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponse(async () => ({
      body: JSON.stringify({ Features: [] }),
    }));

    (IncognitusService as any)._instance = undefined;
  });

  describe('plugin', () => {
    it('includes an install method', async () => {
      const plugin = await IncognitusVue2(defaultConfig);
      expect(plugin.install).toBeDefined();
    });

    describe('install', () => {
      const comp = {
        template: '<div></div>',
      };

      it('initializes the service', async () => {
        const vue = createLocalVue();

        expect(IncognitusService.isReady).toBe(false);

        (await IncognitusVue2(defaultConfig)).install(vue);

        expect(IncognitusService.isReady).toBe(true);
      });

      it('adds the directive', async () => {
        const vue = createLocalVue();
        (await IncognitusVue2(defaultConfig)).install(vue);

        const vueInst = (vue as unknown) as VueInstance;
        const directives = vueInst?.sealedOptions?.directives || {};

        expect(directives['feature-flag']).toBeDefined();
      });

      it('adds the isReady computed prop', async () => {
        const localVue = createLocalVue();
        (await IncognitusVue2(defaultConfig)).install(localVue);
        const wrapper = mount(comp, { localVue });

        expect((wrapper.vm as any).incognitusReady).toEqual(
          IncognitusService.isReady,
        );
      });
    });
  });

  describe('injector', () => {
    it('registeres the injection symbol', async () => {
      expect(Object.getOwnPropertySymbols(injectIncognitus)).toContain(
        incognitusSymbol,
      );
    });

    it('returns the same instance as the service', async () => {
      await IncognitusService.initialize(defaultConfig);
      expect(injectIncognitus[incognitusSymbol]()).toEqual(
        IncognitusService.instance,
      );
    });
  });
});
