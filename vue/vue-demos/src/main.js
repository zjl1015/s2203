import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
// import bufanUi from '../modules/bufan-ui/index'
import Transfer from '../modules/bufan-ui/Transfer'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(bufanUi)
app.use(Transfer)

app.mount('#app')
