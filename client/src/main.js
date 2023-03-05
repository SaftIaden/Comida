import { Quasar, Dialog } from 'quasar';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import quasarIconSet from 'quasar/icon-set/material-icons';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    Dialog,
  },
  iconSet: quasarIconSet,
});

app.mount('#app');
