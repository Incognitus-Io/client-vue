import { createLocalVue, mount } from '@vue/test-utils';
import { defineComponent } from 'vue-demi';
import fetchMock from 'jest-fetch-mock';
import { IncognitusConfig } from '@incognitus/client-web-core';

import {
  initIncognitus,
  initStore,
  reset,
  useIncognitus,
} from '../useIncognitus';

const localVue = createLocalVue();

const comp = defineComponent({
  template: `
  <div>
    <span id="ready">{{ isReady }}</span>
    <span id="svc">{{ service !== null }}</span>
  </div>`,
  setup: () => ({
    ...useIncognitus(),
  }),
});

const defaultConfig = Object.freeze({
  tenantId: 'abc',
  applicationId: 'xyz',
  aipUrl: 'https://localhost',
} as IncognitusConfig);

describe('useIncognitus hook', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    reset();
    fetchMock.mockResponse(async () => ({
      body: JSON.stringify({ Features: [] }),
    }));
  });

  it('must call `initStore` before `initIncognitus`', async () => {
    await expect(() => initIncognitus(defaultConfig)).rejects.toThrow();
  });

  it('is maked as not ready when service is not initialized', () => {
    initStore();
    const wrapper = mount(comp, { localVue });

    expect(wrapper.find('#ready').text()).toBe('false');
  });

  it('returns a null service when service is not initialized', () => {
    initStore();
    const wrapper = mount(comp, { localVue });

    expect(wrapper.find('#svc').text()).toBe('false');
  });

  it('returns the service when service is initiatlized', async () => {
    initStore();
    await initIncognitus(defaultConfig);
    const wrapper = mount(comp, { localVue });

    expect(wrapper.find('#svc').text()).toBe('true');
  });

  it('is maked as ready when service is initialized', async () => {
    initStore();
    await initIncognitus(defaultConfig);
    const wrapper = mount(comp, { localVue });

    expect(wrapper.find('#ready').text()).toBe('true');
  });
});
