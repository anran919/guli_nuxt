<template>
  <el-container>
    <el-main style="padding-left: 40px; padding-right: 40px;">
      <el-row :gutter="20" >
        <el-col v-for=" v in list " :span="6" :key="v.id" style="margin-bottom:20px;">
          <el-card
            :body-style="{ padding: '10px'}"
            shadow="hover">
            <div style="display: flex;flex-direction: column;align-items: center;">
              <el-avatar :size="130" :src="v.cover"/>
              <h3 style="margin-top:10px;font-weight: bold" >{{ v.title }}</h3>
              <h5 style="margin-top:10px;"> 价格: {{ v.price }}</h5>
              <el-divider/>
              <h6 style="height:20px; color: gray">课时数:{{ v.lessonNum }}</h6>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { getCoursePageList } from '~/api/course'
export default {
  data() {
    return {

    }
  },
  asyncData({ params, err }) {
    return getCoursePageList(1, 8).then(res => {
      return {
        list: res.data.data.records
      }
    })
  }
}
</script>

<style>

</style>
