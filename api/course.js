import request from '@/utils/request'
export function getCoursePageList(pageNo, pageSize) {
  return request({
    url: `/service_edu/front/course/pageList/${pageNo}/${pageSize}`,
    method: 'GET'
  })
}
