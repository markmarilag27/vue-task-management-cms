const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "index" */ './views/IndexPage.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/:uuid',
        name: 'subtask',
        component: () => import(/* webpackChunkName: "index" */ './views/IndexPage.vue'),
        meta: { requiresAuth: true },
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './views/auth/LoginPage.vue'),
    meta: { requiresAuth: false }
  }
]

export default routes
