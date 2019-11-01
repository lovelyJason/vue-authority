import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import Home from '../containers/Home/Home.vue'
import Login from '../containers/Login/Login.vue'
import Exam1 from '../containers/Exam1/Exam1.vue'
import Exam2 from '../containers/Exam2/Exam2.vue'
import axios from 'axios'

Vue.use(Router)

var router = new Router({
  routes: [
    // { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/exam1', name: 'exam1', component: Exam1, props: { authorityId: 200 } },
    { path: '/exam2', name: 'exam2', component: Exam2, props: { authorityId: 500 } }
  ]
})

const verifyRouteAuthority = async (to, from, next) => {
  // 获取路由的props下的authorityId信息,进入该函数时,表示已经login过
  const defaultConfig = to.matched[to.matched.length - 1].props.default;
  const authorityId = (defaultConfig && defaultConfig.authorityId) ? defaultConfig.authorityId : null;

  // 1.authorityId存在，表示需要权限控制的页面
  if (authorityId) {
    console.log('authorityId存在')
    // 获取vuex中存储权限信息的模块，authority为该模块名
    const authorityState = store.state;
    console.log(authorityState.rights)
    // 1.1 先解决刷新的问题以便1.2判断权限  为null的场景： 从空tab或别的网站进入到eod（如输入url、sso登录跳转过来）；刷新页面或第一次打开页面；
    //  如果是刷新了导致存储的权限路由配置信息没了，则要重新请求获取权限，判断刷新页是否拥有权限
    if (authorityState.rights === null) {
      const userId = window.localStorage.getItem('userId');
      // const userId = window.sessionStorage.getItem('userId');
      console.log('usrId:',userId)
      // 1.1.1 当前页刷新或登录后第一次进入该页面
      if (userId) {
        // 重新获取权限，以下为例子
        const res = await axios.get('http://127.0.0.1:1234/login',{ params: {
          router: to.name
        } })
        store.dispatch('setRights', res.data);
      } else {
        // 1.1.2 如果是非当页刷新，则跳转到首页---进到这个函数里面时一定登陆过
        // tips: 使用了sesstionStorage才会走进来这里,跨标签页数据不会共享,而localStorage一定能取到值,也就没必要区分
        next({ path: '/home' });
        return true;
      }
    }
    // 1.2 无权限则跳转到首页
    if (!authorityState.rights.includes(authorityId)) {
      console.log('无此权限')
      next({ path: '/home' });
      return true;
    }
  }
  // 2.不需要权限如首页(权限id不存在) 或者 当前页刷新重新生成了权限时会走过来
  return false;
};

/**
 * 能进入路由页面的处理
 */
const enterRoute = async (to, from, next) => {
  //非 login页面进行登录验证
  if (to.path != '/login') {
    // 判断是否存在  token
    if (!window.localStorage.getItem('userId')) {
    // if (!window.sessionStorage.getItem('userId')) {
      router.push('/login')
      return
    } else {
      // 进行权限控制校验
      const res = await verifyRouteAuthority(to, from, next);
      // 如果通不过检验已进行内部跳转，则退出该流程
      if (res) {
        return;
      }
      // 不需要权限 或者 有权限(刷新当页重新生成权限时的逻辑会走过来)
      next()
    }
  } else {
    // 未登录过
    // 进行登录验证以及获取必要的用户信息等操作
    if(!window.localStorage.getItem('userId')) {
      next()
    } else {
      next({ path: '/home' })
    }

  }
};

router.beforeEach((to, from, next) => {
  console.log(to,from)
  // 无匹配路由
  if (to.matched.length === 0) {
    console.log('无匹配路由')
    // 跳转到首页 添加query，避免手动跳转丢失参数，例如token
    next({
      path: '/',
      query: to.query
    });
    return;
  }
  enterRoute(to, from, next);
});

export default router
