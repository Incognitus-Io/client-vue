import {
  IncognitusConfig,
  IncognitusService,
} from '@incognitus/client-web-core';
import { computed, Ref, ref } from 'vue-demi';

/* test-code */
export const reset = () => {
  svc = (undefined as unknown) as Ref<IncognitusService | null>;
};
/* end-test-code */

let svc: Ref<IncognitusService | null>;

export const initStore = () => {
  svc = ref(null);
};

export const initIncognitus = async (config: IncognitusConfig) => {
  svc.value = await IncognitusService.initialize(config);
};

export const useIncognitus = () => {
  const service = computed(() => svc && svc.value);
  const isReady = computed(() => svc && svc.value != null);
  return {
    service,
    isReady,
  };
};
