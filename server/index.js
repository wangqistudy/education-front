/*
 * @Author: David
 * @Date: 2019-10-26 13:05:39
 * @LastEditTime: 2019-11-27 15:46:50
 * @LastEditors: Do not edit
 * @Description: 
 */
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(async (ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    // console.log(ctx.req.url)
    if (ctx.req.url==='/publish'&&(!config.dev)) {
        ctx.respond = true
        try {
          let std = await exec('cd /usr/share/nginx/xinyidai-PCweb;pwd;git pull origin ssrdev;pm2 restart all;')
          // console.log(std)
          ctx.body = JSON.stringify(std);
        }catch(e) {
          // console.log(e)
          ctx.body = JSON.stringify(e);
        }
        
        return;
    }
    if (ctx.req.url==='/backpublish'&&(!config.dev)) {
        ctx.respond = true
        try {
          let std = await exec('cd /usr/share/nginx/xinyidai-htweb;pwd;git pull origin master;rm -rf /usr/share/nginx/xinyidai-ht/public/back/*;cp -a ./dist/* ../xinyidai-ht/public/back/')
          // console.log(std)
          ctx.body = JSON.stringify(std);
        }catch(e) {
          // console.log(e)
          ctx.body = JSON.stringify(e);
        }
        
        return;
    }
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
