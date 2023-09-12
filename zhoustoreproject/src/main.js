import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/css/index.scss';
import '@/assets/iconfont/iconfont.css';
import * as ElIcons from '@element-plus/icons-vue';
// import 'viewerjs/dist/viewer.css';
// import VueViewer from 'v-viewer';
import locale from 'element-plus/dist/locale/zh-cn.mjs';
import router from './router/index';
import { register } from './register';
import { directive } from './directive';
import { $post } from './utils/request';
import { $dialog } from './utils/common';
const app = createApp(App);
app.use(router);
app.use(ElementPlus, { locale });
app.use(createPinia());
const prototype = app.config.globalProperties;
prototype.$post = $post;
prototype.$dialog = $dialog;
register(app);
directive(app);
const ElIconsData = ElIcons as unknown as Array<
  () => Promise<typeof import('*.vue')>
>;
for (const iconName in ElIconsData) {
  app.component(`ElIcon${iconName}`, ElIconsData[iconName]);
}

// 去掉控制台警告
app.config.warnHandler = () => null;
// app.use(VueViewer, {
//   defaultOptions: {
//     zIndex: 9999
//     // url: 'data-source' // 设置大图片的 url
//   }
// });
app.mount('#app');
window.vm = app as any;
