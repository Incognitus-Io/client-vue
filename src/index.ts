/* vue2-start */
import { IncognitusVue2 } from './plugins/vue2';
export { useIncognitus } from './hooks/useIncognitus';
/* vue2-end */
/* vue3-start */
import { IncognitusVue3 } from './plugins/vue3';
/* vue3-end */

const getPlugin = () => {
  /* vue2-start */
  return IncognitusVue2;
  /* vue2-end */

  /* vue3-start */
  return IncognitusVue3;
  /* vue3-end */
};

export const incognitus = getPlugin();
export default incognitus;
