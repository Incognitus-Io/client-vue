import Vue from 'vue';
import { App } from '@vue/runtime-core';
import {
  IncognitusConfig,
  IncognitusService,
} from '@incognitus/client-web-core';
export { IncognitusConfig } from '@incognitus/client-web-core';

import {
  FeatureFlagDirective2,
  FeatureFlagDirective3,
} from './featureFlag.directive';

export const incognitusSymbol = Symbol();

export const createIncognitusClient = () => {
  const install2 = async (app: typeof Vue, options: IncognitusConfig) => {
    await IncognitusService.initialize({ ...options });

    app.directive('feature-flag', FeatureFlagDirective2);
    app.mixin({
      methods: { incognitusReady: () => IncognitusService.isReady },
    });
  };

  const install3 = async (app: App, options: IncognitusConfig) => {
    await IncognitusService.initialize({ ...options });

    app.directive('feature-flag', FeatureFlagDirective3);
    app.provide(incognitusSymbol, IncognitusService.instance);
  };

  return {
    install: install2,
  };
};
