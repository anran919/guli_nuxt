import request from '@/utils/request'
export function login(data) {
  return request({
    url: `/service_ucenter/member/login`,
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export function getUser() {
  return request({
    url: `/service_ucenter/member/auth`,
    method: 'GET'
  })
}

