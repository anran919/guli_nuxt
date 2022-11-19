<template>
  <el-container>
    <el-main style="padding-left: 40px; padding-right: 40px;">
      <h3>讲师介绍</h3>
      <el-divider/>
      <div style="display: flex;">
        <div style="padding: 50px">
          <el-avatar :size="200" :src="teacher.avatar"/>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: center;">
          <div>
            <h2>{{ teacher.name }} {{ ['高级讲师','资深讲师'][teacher.level] }}</h2>
            <el-tag type="info" style="margin-top: 10px;">{{ teacher.intro }}</el-tag>
          </div>
          <br>
          <div>
            <span style="font-size:16px;color: gray;">
              其余方法均不推荐。例如第二点，style如果不设置scope属性就是全局样式
              ，只不过是在使用到该vue文件的时候才会加载到全局而已。而如果想仅在当前文件内生效，
              那就得确保定义的class名需要全局唯一。在多人协作开发时，对开发者的心智负担较高。
              第三点不建议是因为样式代码过于分散，相信做为一个前端，不写内联样式应该是一个必备的修养
              。所以抛开全局样式覆盖外，在仅需要当前页面组件里修改默认样式的方法，应该通过class+::
              v-deep的方式组合使用（如果嫌麻烦可以直接::v-deep一把梭），首先有scope的保障，不会
              增加开发者的心智负担，其次沟通成本最低
            </span>
          </div>
        </div>
      </div>
      <h3>讲师课程</h3>
      <el-divider/>
      <el-row :gutter="20" >
        <el-empty v-if="!courseList.length>0" description="暂无数据"/>
        <el-col v-for=" v in courseList " :span="6" :key="v.id" style="margin-bottom:20px;">
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
import { getTeacherInfoById } from '@/api/teacher'
export default {
  asyncData({ params, err }) {
    const id = params.id
    return getTeacherInfoById(id).then(res => {
      const { teacher, courseList } = res.data.data
      return {
        courseList,
        teacher
      }
    })
  }
}
</script>

<style>

</style>
