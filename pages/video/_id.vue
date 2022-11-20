<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <div>
      <div id="J_prismPlayer"/>
    </div>
  </div>
</template>

<script>
import { getVideoAuthById } from '@/api/video'
export default {
  layout: 'player',
  name: 'VideoPlay',
  head: {
    script: [
      {
        type: 'text/javascript',
        charset: 'utf-8',
        src: 'https://g.alicdn.com/de/prismplayer/2.13.2/aliplayer-h5-min.js'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://g.alicdn.com/de/prismplayer/2.13.2/skins/default/aliplayer-min.css'
      }
    ]
  },
  asyncData({ params, error }) {
    // TODO
    const id = params.id
    // const id = '5852a477dc624d78ac56edf9eb354600'
    // const id = 'f814454db5a74054960f54e6d512fffc'
    return getVideoAuthById(id).then(res => {
      return {
        vid: id,
        videoAuth: res.data.data.playAuth
      }
    })
  },
  mounted() {
    // eslint-disable-next-line no-undef
    new Aliplayer({
      id: 'J_prismPlayer',
      vid: this.vid, // 视频id
      playauth: this.videoAuth, // 播放凭证
      // encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
      width: '100%',
      height: '500px'
    }, function(player) {
      console.log('播放器创建成功')
    })
  }
}
</script>

<style>

</style>
