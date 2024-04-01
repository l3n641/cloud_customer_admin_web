import request from '@/utils/request'

export function getMerchantList(params) {
  return request({
    url: '/admin/merchant',
    method: 'get',
    params
  })
}

export function getMerchantDetail(id) {
  return request({
    url: '/admin/merchant/' + id,
    method: 'get'
  })
}

export function addMerchant(data) {
  return request({
    url: '/admin/merchant',
    method: 'post',
    data
  })
}

export function updateMerchant(id, data) {
  return request({
    url: '/admin/merchant/' + id,
    method: 'put',
    data
  })
}
