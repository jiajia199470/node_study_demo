import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList.vue'
import Title from '@/views/Title.vue'
import Image from '@/views/Image.vue'
import Cart from '@/views/Cart.vue'

Vue.use(Router);


export default new Router({
  mode:'history',//不使用hash http://localhost:8081/#/goods
  routes: [
      {
          path: '/',
          name: 'GoodsList',
          component:GoodsList
      },{
      path: '/goods',
      name: 'GoodsList',
      components: {
          default:GoodsList,
          title:Title,
          image:Image
      },
      children:[
          {
              path:'title',
              name:'title',
              component:Title
          },
          {
              path:'image',
              name:'image',
              component:Image
          }
      ]
    },
    {
        path: '/cart',
        name: "cart",
        component: Cart
    }
  ]
})

