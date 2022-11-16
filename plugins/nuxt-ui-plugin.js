import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import VueQriously from 'vue-qriously'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'

export default () => {
  Vue.use(VueAwesomeSwiper)
  Vue.use(VueQriously)
  Vue.use(Element, { locale })
}
