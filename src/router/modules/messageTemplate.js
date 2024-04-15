/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const messageTemplateRouter = {
  path: '/message-template',
  component: Layout,
  redirect: '/message-template',
  meta: {
    title: '消息模板'
  },
  children: [
    {
      meta: {
        title: '消息模板',
        icon: 'el-icon-message'
      },
      path: '/message-template',
      name: 'MessageTemplate',
      component: () => import('@/views/messageTemplate/Index')
    }
  ]
}

export default messageTemplateRouter
