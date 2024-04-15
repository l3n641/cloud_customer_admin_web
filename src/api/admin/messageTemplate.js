import request from '@/utils/request'

export function createMessageTemplate(data) {
  return request({
    url: '/admin/message-template',
    method: 'post',
    data
  })
}

export function getMessageTemplate(params) {
  return request({
    url: '/admin/message-template',
    method: 'get',
    params
  })
}

export function getMessageTemplateDetail(id) {
  return request({
    url: '/admin/message-template/' + id,
    method: 'get'
  })
}

export function updateMessageTemplate(id, data) {
  return request({
    url: '/admin/message-template/' + id,
    method: 'put',
    data
  })
}

export function deleteMessageTemplate(id) {
  return request({
    url: '/admin/message-template/' + id,
    method: 'delete'
  })
}
