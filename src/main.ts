// import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'  // import PrimeVue
import './assets/basic.css' //compulsory
import 'primevue/resources/themes/saga-blue/theme.css'  // theme

import './assets/extras.css' //compulsory


// import 'primeicons/primeicons.css'                      // icons
// import '/node_modules/primeflex/primeflex.css'          // PrimeFlex

createApp(App).use(PrimeVue).mount('#app')
