<template>
  <el-container>
    <el-main style="padding-left: 40px; padding-right: 40px;">
      <h3>全部课程</h3>
      <el-divider/>
      <div>
        <ul style="list-style:none; display: flex;margin-bottom: 15px">
          <span style="font-size: 15px;">课程类别</span>
          <li style="margin-left: 25px; font-size: 15px;">
            <a :class="{active:-1===level1Index}" href="#" @click="subjectParentId = undefined;subjectId=undefined ;level1Index =-1;fetechCourseList()"> 全部</a>
          </li>
          <li v-for="(s ,i) in subjects" :key="s.id" style="margin-left: 25px; font-size: 15px;" >
            <a :class="{active:i===level1Index}" href="#" @click="subjectParentId = s.id;level1Index =i">{{ s.title }}</a>
          </li>
        </ul>
        <ul style=" display: flex;list-style:none;margin-bottom: 15px;padding-left: 60px">
          <li v-for="(s, k) in childList" :key="s.id" style="margin-left: 25px; font-size: 15px;" >
            <a :class="{active:k===level2Index}" href="#" @click="subjectId=s.id;level2Index =k;fetechCourseList()">{{ s.title }}</a>
          </li>
        </ul>
      </div>
      <el-divider/>
      <ul style=" display: flex;list-style:none;margin-bottom: 15px;padding-left: 60px;background-color: #f3f3f3; padding: 15px 0px;">
        <li v-for="(v,k) in sortKeys" :key="v.key" style="margin-left: 25px; font-size: 15px;" >
          <a :class="{s_active:k===sortIndex}" href="#" @click="sortIndex=k;sortColumn=v.key;fetechCourseList()">{{ v.label }}<span :class="{hide:k!=sortIndex }"> ↓</span></a>
        </li>
      </ul>
      <el-row :gutter="20" >
        <el-col v-for=" v in list " :span="6" :key="v.id" style="margin-bottom:20px;">
          <el-card
            :body-style="{ padding: '0px 0px 10px 0px '}"
            shadow="hover">
            <nuxt-link :to="`/course/${v.id}`" style="display: flex;flex-direction: column;align-items: center;">
              <el-image :src="v.cover" style="width:100% ;height: 200px;" />
              <div
                style="display: flex; align-items: center;width: 100%;justify-content: space-between; padding: 15px;" >
                <h3 style="font-weight: bold;margin-left: 15px;" >{{ v.title }}</h3>
                <el-tag effect="dark" style="margin-right:15px" type="success">{{ v.price >0 ? `¥${v.price}`:'免费' }}</el-tag>
              </div>
              <div style="width: 100%;justify-content: space-around;display: flex;">
                <h6 style="height:20px; color: gray">{{ `${v.buyCount}人学习` }}</h6>
                <span>|</span>
                <h6 style="height:20px; color: gray">{{ `${v.viewCount}人评论` }}</h6>
                <span>|</span>
                <h6 style="height:20px; color: gray">课时数:{{ v.lessonNum }}</h6>
              </div>
            </nuxt-link>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        :total="total"
        :page-size="pageSize"
        style="float: right"
        background
        layout="prev, pager, next"
        @current-change="onPageChange"/>
    </el-main>
  </el-container>
</template>

<script>
import { getCoursePageList } from '~/api/course'
import { getSubjectList } from '~/api/subject'
export default {
  name: 'Course',
  data() {
    const sortKeys = [
      { label: '销量', 'key': 'buyCount' },
      { label: '最新', 'key': 'gmtModified' },
      { label: '价格', 'key': 'price' }
    ]
    return {
      total: 10,
      pageSize: 8,
      list: [],
      subjects: [],
      subjectParentId: undefined,
      subjectId: undefined,
      sortKeys,
      level1Index: -2,
      level2Index: -2,
      sortIndex: -1,
      sortColumn: ''
    }
  },
  computed: {
    childList() {
      let children = []
      if (this.subjectParentId == null) {
        children = this.subjects.filter(v => v.children.length>0).map(v => v.children).flat(Infinity)
      } else {
        const list = this.subjects.filter(v => v.id === this.subjectParentId)
        if (list.length>0) {
          children = list[0].children
        }
      }
      return children
    }
  },
  created() {
    this.fetechCourseList()
    this.getSubjects()
  },
  methods: {
    fetechCourseList(pageNo = 1) {
      const { sortColumn, subjectParentId, subjectId } = this
      let params = { }
      if (sortColumn === 'buyCount') {
        params = { buyCount: 1 }
      } else if (sortColumn === 'gmtModified') {
        params = { gmtModified: new Date().getTime() }
      } else if (sortColumn === 'price') {
        params = { price: 1 }
      } else {
        params = { }
      }
      params.subjectParentId = subjectParentId
      params.subjectId = subjectId
      getCoursePageList(pageNo, this.pageSize, params).then(res => {
        const { records, total } = res.data.data.data
        this.list = records
        this.total = total
      })
    },
    onPageChange(pageNo) {
      this.fetechCourseList(pageNo)
    },
    getSubjects() {
      getSubjectList().then(res => {
        this.subjects = res.data.data.list
      })
    }
  }

}
</script>

<style>
.active{
  background-color: #ffbc32 ;
  /* background-color: #5dc490 ; */
  color:white !important;
  padding: 5px;
  border-radius: 5px;
}

.s_active{
  background-color: #ffbc32 ;
  color:white !important;
  padding: 5px 7px;
  border-radius: 4px;
}

.hide{
  display: none;
}
.show{
  display: block;
}
</style>
