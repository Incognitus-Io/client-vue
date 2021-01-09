import { createApp } from 'vue';
import { incognitus } from '@incognitus/client-vue';

import App from './App.vue';

createApp(App)
  .use(incognitus, {
    tenantId: '{ Insert Tenant ID }',
    applicationId: '{ Insert Application ID }',
  })
  .mount('#app');
