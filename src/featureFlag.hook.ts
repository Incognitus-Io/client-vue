/* vue2-start */
import {
  Ref as RefV2,
  ComputedRef as CompRefV2,
  computed as computed2,
  inject as inject2,
  getCurrentInstance,
} from '@vue/composition-api';
/* vue2-end */

/* vue3-start */
import { inject as inject3 } from '@vue/runtime-core';
/* vue3-end */

import { IncognitusService } from '@incognitus/client-web-core';

import { incognitusSymbol } from './constants';

/* vue2-start */
export interface IncognitusHookV2 {
  incognitus: IncognitusService;
  isReady: RefV2<boolean>;
}

export const useIncognitusV2 = (): IncognitusHookV2 => {
  console.warn(getCurrentInstance());
  const svcFactory = inject2<() => IncognitusService>(incognitusSymbol);
  if (!svcFactory) {
    throw new Error(
      'You must call `Vue.use(Incognitus)` before using this hook.',
    );
  }

  return {
    incognitus: svcFactory(),
    isReady: computed2(() => IncognitusService.isReady),
  };
};
/* vue2-end */

/* vue3-start */
export interface IncognitusHookV3 {
  incognitus: CompRefV2<IncognitusService>;
  isReady: CompRefV2<boolean>;
}

export const useIncognitusV3 = (): IncognitusHookV3 => {
  inject3<IncognitusService>(incognitusSymbol);
  throw new Error();
};
/* vue3-end */

export const useIncognitus = () => {
  /* vue2-start */
  return useIncognitusV2();
  /* vue2-end */

  /* vue3-start */
  return useIncognitusV3();
  /* vue3-end */
};
