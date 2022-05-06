import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"

//git add .
// git commit -m "(message)"
//git push -u origin main


const app = createApp(App)
app.use(router)

app.mount('#app')
