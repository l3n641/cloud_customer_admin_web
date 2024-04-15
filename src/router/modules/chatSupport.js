/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chatSupportRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users',
  meta: {
    title: '客服管理',
    icon: 'el-icon-user-solid'

  },
  children: [
    {
      meta: {
        title: '客服列表',
        icon: 'el-icon-user'
      },
      path: '/chat-support',
      name: 'ChatSupport',
      component: () => import('@/views/chatSupport/ChatSupportList')
    },
    {
      meta: {
        title: '商户列表',
        icon: 'el-icon-s-custom'
      },
      path: '/merchant',
      name: 'Merchants',
      component: () => import('@/views/merchant/MerchantList')
    }
  ]
}

export default chatSupportRouter
