import request from '@/utils/request'
export function getTeacherPageList(pageNo, pageSize) {
  return request({
    url: `/service_edu/front/teacher/pageList/${pageNo}/${pageSize}`,
    method: 'GET'
  })
}

/**
 *
 * @param {获取教师信息} id
 */
export function getTeacherInfoById(id) {
  return request({
    url: `/service_edu/front/teacher/info/${id}`,
    method: 'GET'
  })
}

