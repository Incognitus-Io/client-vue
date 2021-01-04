import Vue from 'vue';
import CompApi from '@vue/composition-api';
import Incognitus from '@incognitus/client-vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(CompApi);
Vue.use(Incognitus, {
  tenantId: 'f632ac6a71e57bc77a8cb7d04c8704e52b9a5538',
  applicationId: 'fecf1202.8edffdf0',
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
