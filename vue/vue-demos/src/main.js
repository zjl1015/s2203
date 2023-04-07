import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import './assets/main.css'
// import bufanUi from '../modules/bufan-ui/index'
// import Transfer from '../modules/bufan-ui/Transfer'
import bufanUi from '@/plugins/bufan-ui/Transfer/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(bufanUi)
// app.use(Transfer)
app.use(bufanUi)

app.mount('#app')
