import Vue from 'vue';
import CompApi from '@vue/composition-api';
import Incognitus from '@incognitus/client-vue';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(CompApi);
Vue.use(Incognitus, {
  tenantId: '{ Insert Tenant ID }',
  applicationId: '{ Insert Application ID }',
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
