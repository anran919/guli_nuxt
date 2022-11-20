<template>
  <el-container>
    <el-main style="padding:20px 200px">
      <el-card :body-style="{ padding: '0px' }">
        <el-row style="height:400px">
          <el-col :span="12">
            <el-image :src="info.cover" class="iamge" />
          </el-col>
          <el-col :span="2" class="col_2">
            <div class="col_2_d">
              <h3>购买数</h3>
              <h4 style="margin-top:10px">12</h4>
            </div>
            <el-divider/>
            <div class="col_2_d">
              <h3>课时数</h3>
              <h4 style="margin-top:10px">12</h4>
            </div>
            <el-divider/>
            <div class="col_2_d">
              <h3>浏览数</h3>
              <h4 style="margin-top:10px">12</h4>
            </div>
          </el-col>
          <el-col :span="10" class="col_10">
            <h3 style="margin-top:100px">
              {{ info.title }}
            </h3>
            <br>
            <h3>
              价格: <span style="color:yellow">¥ {{ info.price }}</span>
            </h3>
            <el-divider/>
            <h3>主讲 :  {{ info.teacherName }} |  {{ info.career }}</h3>
            <div style="margin-top: 100px">
              <el-button type="warning" icon="el-icon-star-off" size="small">收藏</el-button>
              <el-button type="success" icon="el-icon-video-play" size="small">立即观看</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-row :gutter="24" style="margin-top:15px" >
        <el-col :span="18">
          <el-card style="height:300px">
            <h3>课程详情</h3>
            <el-divider/>
            <h4>课程介绍</h4>
            <p style="margin-top: 15px" v-html="info.description"/>
            <br>
          </el-card>
          <el-card style="height:300px;margin-top: 15px;">
            <h4>课程大纲</h4>
            <el-tree
              :data="chapters"
              :props="treeProps"
              default-expand-all
              node-key="id"
              style=" margin-top: 15px"
            >
              <div slot-scope="{data}" >
                <div style="padding:15px">
                  <span>{{ data.title }}</span>
                  <nuxt-link v-show="data.videoSourceId" :to="`/video/${data.videoSourceId}`" target ="_blank">
                    立即观看
                  </nuxt-link>
                </div>
              </div>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card >
            <h3>讲师简介</h3>
            <el-divider/>
            <div style="display:flex">
              <el-avatar :src="info.cover" :size="84" style="width:84px" fit="fill"/>
              <ul class="ul_teacher">
                <li> {{ info.teacherName }}</li>
                <li> {{ ['高级讲师',"首席讲师"][info.level+1] }}</li>
                <li> {{ info.career }}</li>
              </ul>
            </div>
            <p style="margin-top: 15px" v-html="info.intro"/>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getCourseById } from '@/api/course'
export default {
  name: 'CourseInfo',
  data() {
    return {
      treeProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    // expandedKeys() {
    //   return this.chapters.map(v => v.id)
    // }
  },
  asyncData(context) {
    const { params } = context
    const id = params.id
    return getCourseById(id).then(res => {
      const { chapters, cvo } = res.data.data
      return {
        info: cvo,
        chapters
      }
    })
  }
}
</script>

<style>
.col_2 {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  background-color: #ffbc32 ;
  align-items: center;
}
.col_2_d{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  justify-content: center;
  height: 100%;
}
.iamge{
  width: 100%;
  height: 400px;
}
.col_10{
  padding-left: 40px;
  background-color: #234765;
  color: white;
  height: 100%;
}
.ul_teacher{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  margin-left: 15px;
  font-size: 15px;
}

</style>
