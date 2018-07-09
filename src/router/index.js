import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import Rental from '@/components/Rental'
import readBoard from '@/components/readboard'
import createLog from '@/components/createLog'
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
    },,
    {
      path: '/rental',
      name: 'Rental',
      component: Rental
    },
    {
        path: '/read',
        name: 'readBoard',
        component: readBoard
    },
    {
      path:'/create',
      name:'createLog',
      component: createLog
    }
  ]
})
