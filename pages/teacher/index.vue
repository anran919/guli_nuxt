<template>
  <el-container>
    <el-main style="padding-left: 40px; padding-right: 40px;">
      <el-row :gutter="20" >
        <el-empty v-if="!list.length>0" description="暂无数据"/>
        <el-col v-for=" v in list " v-else :span="6" :key="v.id" style="margin-bottom:20px;">
          <el-card
            :body-style="{ padding: '10px'}"
            class="card"
            shadow="hover"
          >
            <nuxt-link :to="`/teacher/${v.id}`" style="display: flex;flex-direction: column;align-items: center;">
              <el-avatar :size="130" :src="v.avatar" class="avatar"/>
              <h3 style="margin-top:10px;font-weight: bold" >{{ v.name }}</h3>
              <h5 style="margin-top:10px;word-break: break-all;text-overflow: ellipsis;-webkit-line-clamp: 2; overflow: hidden;height: 36px;"> {{ v.intro }}</h5>
              <el-divider/>
              <h6 style="height:16px; color: gray">{{ v.career||'' }}</h6>
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
import { getTeacherPageList } from '@/api/teacher'
export default {
  data() {
    return {

    }
  },
  asyncData({ params, err }) {
    return getTeacherPageList(1, 8).then(res => {
      const { total, records, pageSize } = res.data.data
      return {
        list: records,
        total,
        pageSize
      }
    })
  },
  methods: {
    onPageChange(pageNo) {
      getTeacherPageList(pageNo, 8).then(res => {
        this.list = res.data.data.records
      })
    }
  }
}
</script>

<style>
a:hover{
  cursor: pointer;
}
.avatar:hover {
  transform:rotateY(180deg);
	-ms-transform:rotateY(180deg); /* IE 9 */
	-webkit-transform:rotateY(180deg);
}

a:link {
  color: black;
  text-decoration:underline;
}
a:visited {
  color:#5dc490;
  text-decoration:none;
}
a:hover {
  color:black;
  text-decoration:none;
}
a:active {
  color:#5dc490;
  text-decoration:none;
}

</style>
