import request from '@/utils/request'
/**
 * 获取手机验证码
 * @param { 手机号 } mobile
 * @returns
 */
export function getAuthCodeByMobile(mobile) {
  return request({
    url: `/service_sms/sms/send/${mobile}`,
    method: 'GET'
  })
}

/**
 *用户注册
 * @param {注册信息} data
 * @returns
 */
export function registerMemeber(data) {
  return request({
    url: `/service_ucenter/member/register`,
    method: 'POST',
    data
  })
}
