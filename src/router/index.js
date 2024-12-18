import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
      path: '/',
      redirect: '/login'
  },
  {
      path: '/login',
      name: 'login',
      meta: {
          title: '登录'
      },
      component: () => import('@/view/Login.vue')
  },
  {
    path: '/home',
    name: '主页',
    meta: {
        title: '主页'
    },
    component: () => import('@/view/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: () => import('@/view/Welcome.vue')
      },
      {
        path: '/user/list',
        meta: {
            title: '用户管理'
        },
        component: () => import('@/view/user/Index.vue'),
      },
      {
        path: '/user/detail',
        meta: {
            title: '用户详情'
        },
        component: () => import('@/view/user/Detail.vue'),
      },
        //  Dream 新增成绩管理
        {
            path: '/grade/detail',
            meta: {
                title: '成绩详情'
            },
            component: () => import('@/view/grade/Detail.vue'),
        },
        {
            path: '/grade/list',
            meta: {
                title: '成绩列表'
            },
            component: () => import('@/view/grade/Index.vue'),
        },

    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 挂载路由导航守卫：to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  // 放行登录页面
  if (to.path === '/login') {
    return next()
  }
  return next()
})

router.afterEach((to, from) => {
  console.log('Navigated to ${to.fullPath} from ${from.fullPath}')
})
  
// 导出路由
export default router