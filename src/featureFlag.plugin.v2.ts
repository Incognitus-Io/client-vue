/* vue2-start */
import { PluginObject } from 'vue';
import {
  IncognitusConfig,
  IncognitusService,
} from '@incognitus/client-web-core';

import { FeatureFlagDirective2 } from './featureFlag.directive';
import { incognitusSymbol } from './constants';

export interface IncognitusPluginObject extends PluginObject<void> {
  readonly svc: IncognitusService;
  readonly injector: { [incognitusSymbol]: () => IncognitusService };
  initialize: () => Promise<void>;
}

export const IncognitusVue2 = (options: IncognitusConfig) => {
  const initialize = async () => IncognitusService.initialize({ ...options });
  const incognitusReady = () => IncognitusService.isReady;

  return {
    install: (app) => {
      initialize();

      app.directive('feature-flag', FeatureFlagDirective2);
      app.mixin({
        computed: { incognitusReady },
      });
    },
    initialize,
    get svc() {
      return IncognitusService.instance;
    },
    get injector() {
      return { [incognitusSymbol]: () => this.svc };
    },
  } as IncognitusPluginObject;
};
/* vue2-end */
