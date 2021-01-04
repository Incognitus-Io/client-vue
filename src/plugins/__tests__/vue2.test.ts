import Vue, { VueConstructor } from 'vue';
import { createLocalVue } from '@vue/test-utils';
import { IncognitusConfig } from '@incognitus/client-web-core';
import fetchMock from 'jest-fetch-mock';
import CompApi from '@vue/composition-api';

import IncognitusVue2 from '../vue2';

const config = Object.freeze({
  tenantId: 'abc',
  applicationId: 'xyz',
  aipUrl: 'https://localhost',
} as IncognitusConfig);

describe('Vue 2 plugin', () => {
  let localVue: VueConstructor<Vue>;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(CompApi);

    fetchMock.resetMocks();
    fetchMock.mockResponse(async () => ({
      body: JSON.stringify({ Features: [] }),
    }));
  });

  it('initializes the service', async () => {
    localVue.use(IncognitusVue2, config);

    await localVue.nextTick();

    expect(fetchMock).toBeCalledWith(`${config.aipUrl}/feature`, {
      headers: {
        'X-Application': config.applicationId,
        'X-Tenant': config.tenantId,
      },
    });
  });

  it('initializes with default options when none are supplied', async () => {
    localVue.use(IncognitusVue2);

    await localVue.nextTick();

    expect(fetchMock).toBeCalledWith('https://incognitus.io/api/feature', {
      headers: {
        'X-Application': '{ Insert Application ID }',
        'X-Tenant': '{ Insert Tenant ID }',
      },
    });
  });

  it('registers the `feature-flag` component', () => {
    localVue.use(IncognitusVue2, config);
    const options = (localVue as any).options;

    expect(Object.keys(options.components)).toContain('feature-flag');
  });
});
