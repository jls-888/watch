// 导入公共样式
import '@/assets/style.css'
// 导入ElementPlus
import ElementPlus from 'element-plus'
// 导入ElementPlus 语言包
import locale from 'element-plus/es/locale/lang/zh-cn'
// 导入element-plus样式
import 'element-plus/dist/index.css'
// 导入element-plus图标
import * as Icons from '@element-plus/icons-vue'
// 导入mock模拟数据包
import "@/mock/index.js";
// 导入router路由
import router from '@/router/index.js'
// 导入createPinia 方法
import { createPinia } from 'pinia';
// 导入新建应用方法
import { createApp } from 'vue'
// 导入项目主模版文件
import App from './App.vue'
// 新建应用app
const app = createApp(App)
// 注册图标为全局组件
for (let i in Icons) {
    app.component(i, Icons[i])
}
// 全局加载ElementPlus
app.use(ElementPlus, { locale })
// 全局加载router路由
app.use(router)
// createPinia()全局创建Pinia
app.use(createPinia());
app.mount('#app')

