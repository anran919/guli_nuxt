import request from '@/utils/request'
export function getVideoAuthById(videoId) {
  return request({
    url: `service_vod/video/auth/${videoId}`,
    method: 'GET'
  })
}
