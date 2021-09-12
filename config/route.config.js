// 约定式路由配置

export default [
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        component: './Home',
        title: 'Home',
        exact: true
      },
      {
        path: '/404',
        component: './NoFound',
        title: 'No Found',
        exact: true,
      },
      { component: './NoFound' }
    ]
  }
]
