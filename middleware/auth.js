export default function (context) {
    context.userAgent = process.server
        ? context.req.headers['user-agent']
        : navigator.userAgent
}

// context的值
// $config: {_app: {…}}
// app: {head: {…}, router: VueRouter, nuxt: {…}, render: ƒ, data: ƒ, …}
// base: "/"
// env: {}
// error: ƒ ()
// from: {name: 'detail', meta: Array(1), path: '/detail', hash: '', query: {…}, …}
// isDev: true
// isHMR: false
// isStatic: false
// next: ƒ ()
// nuxtState: {layout: 'default', data: Array(1), fetch: {…}, error: null, serverRendered: true, …}
// params: {}
// payload: undefined
// query: {}
// redirect: ƒ (status, path, query)
// route: {name: 'index', meta: Array(1), path: '/', hash: '', query: {…}, …}
// userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36"
// _errored: false
// _redirected: false