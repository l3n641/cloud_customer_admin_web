import request from '@/utils/request'

export function getChatSupportList(params) {
  return request({
    url: '/admin/chat-support',
    method: 'get',
    params
  })
}

export function createChatSupport(data) {
  return request({
    url: '/admin/chat-support',
    method: 'post',
    data
  })
}

export function getChatSupportDetail(id) {
  return request({
    url: '/admin/chat-support/' + id,
    method: 'get'
  })
}

export function updateChatSupport(id, data) {
  return request({
    url: '/admin/chat-support/' + id,
    method: 'put',
    data
  })
}

