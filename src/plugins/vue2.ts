import { PluginObject } from 'vue';
import { IncognitusConfig } from '@incognitus/client-web-core';

import { initStore, initIncognitus } from '../hooks/useIncognitus';
import FeatureFlag from '../components/FeatureFlagV2.vue';

export interface IncognitusPluginObject extends PluginObject<void> {
  initialize: () => Promise<void>;
}

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
