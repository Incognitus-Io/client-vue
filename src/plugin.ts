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

/* vue2-start */
import FeatureFlagV2 from './components/FeatureFlag.v2.vue';
/* vue2-end */
/* vue3-start */
import FeatureFlagV3 from './components/FeatureFlag.v3.vue';
/* vue3-end */
import { initStore, initIncognitus } from './useIncognitus';

export const IncognitusVue: PluginObject<IncognitusConfig> = {
  install: (app, options) => {
    if (!options || !options.tenantId) {
      console.error('You must enter your incognitus tenant id');
      return;
    }
    if (!options || !options.applicationId) {
      console.error('You must enter your incognitus application id');
      return;
    }

    initStore();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    initIncognitus(options);

    /* vue2-start */
    if (isVue2) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app.component('feature-flag', FeatureFlagV2);
    }
    /* vue2-end */
    /* vue3-start */
    if (isVue3) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      app.component('feature-flag', FeatureFlagV3);
    }
    /* vue3-end */
  },
};
export default IncognitusVue;
