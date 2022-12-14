import request from '@/utils/request'
export function getBannerPageList(params) {
  const { pageNo, pageSize } = params
  return request({
    url: `/service_cms/banner/${pageNo}/${pageSize}`,
    method: 'GET',
    params
  })
}

export function getIndexData() {
  return request({
    url: `/service_edu/front/index`,
    method: 'GET'
  })
}
