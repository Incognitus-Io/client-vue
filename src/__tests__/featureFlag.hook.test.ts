import { createApp } from 'vue3';
import { createLocalVue, mount } from '@vue/test-utils';
import { IncognitusService } from '@incognitus/client-web-core';
import fetchMock from 'jest-fetch-mock';
import CompositionApi, {
  defineComponent as defineComponent2,
} from '@vue/composition-api';
import { defineComponent as defineComponent3 } from '@vue/runtime-core';

import { IncognitusVue2, injectIncognitus } from '../featureFlag.plugin.v2';
import { useIncognitusV2, useIncognitusV3 } from '../featureFlag.hook';
import { ComponentOptions } from 'vue';

describe('Hook', () => {
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

  describe('Vue2', () => {
    it('throws if plugin not installed', async () => {
      const localVue = createLocalVue();
      localVue.use(CompositionApi);
      const comp = defineComponent2({
        template: '<div/>',
        setup: () => {
          const incognitus = useIncognitusV2();

          return {
            svc: incognitus,
          };
        },
      });

      jest.spyOn(console, 'error').mockImplementation(() => {
        /* nop */
      });
      expect(() => mount(comp, { localVue })).toThrow();
    });

    it('returns the service', async () => {
      const localVue = createLocalVue();
      localVue.use(CompositionApi);
      localVue.use(await IncognitusVue2(defaultConfig));
      const comp = defineComponent2({
        template: '<div/>',
        setup: () => {
          const incognitus = useIncognitusV2();

          return {
            svc: incognitus,
          };
        },
      });
      const parent = {
        template: '<comp />',
        components: { comp },
        provide: { ...injectIncognitus },
      } as ComponentOptions<Vue>;

      const wrapper = mount(parent, {
        localVue,
      });

      expect((wrapper.findComponent(comp).vm as any).svc).toBeDefined();
    });
  });

  describe('Vue3', () => {
    it.todo('should exist');
  });
});
