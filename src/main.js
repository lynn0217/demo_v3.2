import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import '@/router/permission.js'
import * as ELIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'
import filters from './utils/filter'
// import SvgIcon from '@/icons'
const app = createApp(App)
for(const iconName in ELIcons) {
  app.component(iconName,ELIcons[iconName])
}
// SvgIcon(app)
app.use(store).use(router).use(filters).use(i18n).use(ElementPlus).mount('#app')
