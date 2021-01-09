import Vue, { VueConstructor } from 'vue';
import { createLocalVue } from '@vue/test-utils';
import { IncognitusConfig } from '@incognitus/client-web-core';
import fetchMock from 'jest-fetch-mock';
import CompApi from '@vue/composition-api';

import IncognitusVue2 from '../plugin';

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

  it('writes an error when undefined options', () => {
    const errMock = jest.spyOn(console, 'error').mockImplementation(() => {
      /* nop */
    });

    localVue.use(IncognitusVue2, undefined);

    expect(errMock).toHaveBeenCalled();
  });

  it('writes an error when tenant id is blank', () => {
    const errMock = jest.spyOn(console, 'error').mockImplementation(() => {
      /* nop */
    });

    localVue.use(IncognitusVue2, {
      applicationId: 'abc',
    });

    expect(errMock).toHaveBeenCalled();
  });

  it('writes an error when app id is blank', () => {
    const errMock = jest.spyOn(console, 'error').mockImplementation(() => {
      /* nop */
    });

    localVue.use(IncognitusVue2, {
      tenantId: 'abc',
    });

    expect(errMock).toHaveBeenCalled();
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

  it('registers the `feature-flag` component', () => {
    localVue.use(IncognitusVue2, config);
    const options = (localVue as any).options;

    expect(Object.keys(options.components)).toContain('feature-flag');
  });
});
