import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import Rental from '@/components/Rental'
import PostViewer from '@/components/PostViewer'
import PostUploader from '@/components/PostUploader'
import Login from '@/components/Login'
import MyPage from '@/components/MyPage'
import EmailAuth from '@/components/EmailAuth'
import Organ from '@/components/Organ'
import Completion from '@/components/Completion'
import Curriculum from '@/components/Curriculum'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    {
      path: '/rental',
      name: 'Rental',
      component: Rental
    },
    {
        path: '/postviewer',
        name: 'PostViewer',
        component: PostViewer
    },
    {
      path:'/postuploader',
      name:'PostUploader',
      component: PostUploader
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/emailauth',
      name: 'EmailAuth',
      component: EmailAuth
    },
    {
      path: '/organ' ,
      name: 'Organ',
      component: Organ
    },
    {
      path: '/completion' ,
      name: 'Completion',
      component: Completion
    },
    {
      path: '/curriculum' ,
      name: 'Curriculum',
      component: Curriculum
    }
  ]
})
