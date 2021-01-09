import { PluginObject } from 'vue';
import {
  /* vue2-start */
  isVue2,
  /* vue2-end */
  /* vue3-start */
  isVue3,
  /* vue3-end */
} from 'vue-demi';
import { IncognitusConfig } from '@incognitus/client-web-core';

import { initStore, initIncognitus } from './useIncognitus';

export const IncognitusVue: PluginObject<IncognitusConfig> = {
  install: (app, options) => {
    initStore();
    initIncognitus(
      options || {
        tenantId: '{ Insert Tenant ID }',
        applicationId: '{ Insert Application ID }',
      },
    );

    /* vue2-start */
    if (isVue2) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app.component('feature-flag', require('./components/FeatureFlag.v2.vue'));
    }
    /* vue2-end */
    /* vue3-start */
    if (isVue3) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app.component('feature-flag', require('./components/FeatureFlag.v3.vue'));
    }
    /* vue3-end */
  },
};
export default IncognitusVue;
