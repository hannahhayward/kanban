// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import popper from 'popper.js'
import jquery from 'jquery'
import bootstrap from 'bootstrap'
const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router, bootstrap, jquery, popper)
  .mount('#app')
