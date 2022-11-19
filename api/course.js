import request from '@/utils/request'
export function getCoursePageList(pageNo, pageSize, params = {}) {
  return request({
    url: `/service_edu/front/course/pageList/${pageNo}/${pageSize}`,
    method: 'GET',
    params
  })
}

export function getCourseById(courseId) {
  return request({
    url: `/service_edu/front/course/${courseId}`,
    method: 'GET'
  })
}
