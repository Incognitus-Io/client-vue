/* vue3-start */
import { App, Plugin } from '@vue/runtime-core';
import {
  IncognitusConfig,
  IncognitusService,
} from '@incognitus/client-web-core';

import { FeatureFlagDirective3 } from './featureFlag.directive';
import { incognitusSymbol } from './constants';

export const IncognitusVue3 = async (options: IncognitusConfig) => {
  await IncognitusService.initialize({ ...options });
  return {
    install: (app: App) => {
      app.directive('feature-flag', FeatureFlagDirective3);
      app.provide(incognitusSymbol, IncognitusService.instance);
    },
  } as Plugin;
};
/* vue3-end */
