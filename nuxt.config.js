/*
 * @Author: David
 * @Date: 2019-10-25 10:07:46
 * @LastEditTime: 2019-12-04 15:27:42
 * @LastEditors: Do not edit
 * @Description: 
 */

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title:  '少儿编程培训教育',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '少儿编程,教育,培训,英语,政治,历史,物理,化学,生物,语文,数学,线上选课,视频选课' }
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1427507_t2j0jp24ay.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/ElementUI',
      ssr: true,
    },
    {
      src: '~plugins/store',
      ssr: true,
    },
    {
      src: '~plugins/router.js',
      ssr: true,
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  // cookieParser
  router:{
    middleware:'cookieParser'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
