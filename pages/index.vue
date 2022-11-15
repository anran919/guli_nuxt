<template>
  <div>
    <!-- 幻灯片 开始 -->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div v-for="b in banners " :key="b.id" class="swiper-slide" style="background: #040B1B;">
          <a :href="b.linkUrl" target="_blank">
            <img :alt="b.title" :src="b.imageUrl">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"/>
      <div slot="button-prev" class="swiper-button-prev swiper-button-white"/>
      <div slot="button-next" class="swiper-button-next swiper-button-white"/>
    </div>
    <!-- 幻灯片 结束 -->
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul id="bna" class="of">
                <li v-for="c in courses" :key="c.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :alt="c.title"
                        src="~/assets/photo/course/1442295592705.jpg"
                        class="img-responsive" >
                      <div class="cc-mask">
                        <a href="#" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        :title="c.title"
                        href="#"
                        class="course-title fsize18 c-333">{{ c.title }}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">{{ c.price?` ¥ ${c.price}`:'免费' }}</i>
                      </span> <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ c.buyCount }}人学习</i>
                        |
                        <i class="c-999 f-fA">{{ c.viewCount }}评论</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"/>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="t in teachers" :key="t.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a :title="t.name" href="/teacher/1">
                        <img
                          :alt="t.name"
                          src="~/assets/photo/teacher/1442297885942.jpg">
                      </a>
                    </div> <div class="mt10 hLh30 txtOf tac">
                      <a :title="t.name" href="/teacher/1" class="fsize18 c-666">{{ t.name }}</a>
                    </div> <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ t.career }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{ t.intro }}</p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"/>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
    <!-- /网校名师 结束 -->
    </div>
  </div>
</template>
<script>
import { getBannerPageList, getIndexData } from '@/api/index'
export default {
  name: 'Index',
  data() {
    return {
      banners: [],
      teachers: [],
      courses: [],
      swiperOption: {
        // 配置分页
        pagination: {
          el: '.swiper-pagination'// 分页的dom节点
        },
        // 配置导航
        navigation: {
          nextEl: '.swiper-button-next', // 下一页dom节点
          prevEl: '.swiper-button-prev'// 前一页dom节点
        }
      }
    }
  },
  created() {
    this.getBannerList()
    this.getIndexTeacherAndCourse()
  },
  methods: {
    getIndexTeacherAndCourse() {
      getIndexData().then(res => {
        const { courses, teachers } = res.data.data
        this.courses = courses
        this.teachers = teachers
      })
    },
    getBannerList() {
      const data = {
        pageNo: 1,
        pageSize: 5
      }
      getBannerPageList(data).then(res => {
        this.banners = res.data.data.data.records
      })
    }
  }
}
</script>

