import './assets/all.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// ---------------
import App from './App.vue'
import router from './router'
// ---------------
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingOverlay', Loading)
app.mount('#app')
