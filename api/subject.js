import request from '@/utils/request'
export function getSubjectList() {
  return request({
    url: `service_edu/subject/getTreeList`,
    method: 'GET'
  })
}
