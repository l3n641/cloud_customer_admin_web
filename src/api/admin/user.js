import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/session',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/admin-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/session',
    method: 'delete'
  })
}
