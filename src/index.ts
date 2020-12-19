import { IncognitusConfig } from '@incognitus/client-web-core';
export { IncognitusConfig } from '@incognitus/client-web-core';

export { incognitusSymbol } from './constants';
export { useIncognitus } from './featureFlag.hook';

/* vue2-start */
export { IncognitusPluginObject } from './featureFlag.plugin.v2';
import { IncognitusVue2 } from './featureFlag.plugin.v2';
/* vue2-end */

/* vue3-start */
// export {} from './featureFlag.hook';
import { IncognitusVue3 } from './featureFlag.plugin.v3';
/* vue3-end */

export const createIncognitusClient = (options: IncognitusConfig) => {
  /* vue2-start */
  return IncognitusVue2(options);
  /* vue2-end */

  /* vue3-start */
  return IncognitusVue3(undefined);
  /* vue3-end */
};
