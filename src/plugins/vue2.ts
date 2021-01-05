import { PluginObject } from 'vue';
import { IncognitusConfig } from '@incognitus/client-web-core';

import { initStore, initIncognitus } from '../hooks/useIncognitus';
import FeatureFlag from '../components/FeatureFlag.vue';

export const IncognitusVue2: PluginObject<IncognitusConfig> = {
  install: (app, options) => {
    initStore();
    initIncognitus(
      options || {
        tenantId: '{ Insert Tenant ID }',
        applicationId: '{ Insert Application ID }',
      },
    );

    app.component('feature-flag', FeatureFlag);
  },
};
export default IncognitusVue2;
