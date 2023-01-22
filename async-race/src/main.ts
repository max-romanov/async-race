import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import Unicon from 'vue-unicons'
import { uniTrophy, uniCarSlash, uniRocket, uniPen, uniCornerDownLeft, uniCheckCircle } from 'vue-unicons/dist/icons'

Unicon.add([uniTrophy, uniCarSlash, uniRocket, uniPen, uniCornerDownLeft, uniCheckCircle])

const app = createApp(App)

app.use(createPinia())
app.use(Unicon, {
  fill: "hsla(160, 100%, 37%, 1)",
  height: 18,
  width: 18,
})
app.use(router)

app.mount('#app')
