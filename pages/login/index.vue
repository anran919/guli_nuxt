<template>
  <div class="main">
    <div class="title">
      <nuxt-link class="active" to="/login">登录</nuxt-link>
      <span>·</span>
      <nuxt-link to="/register">注册</nuxt-link>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]" class="input-prepend restyle" prop="mobile">
          <div >
            <el-input v-model="user.mobile" type="text" placeholder="手机号"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]" class="input-prepend" prop="password">
          <div>
            <el-input v-model="user.password" type="password" placeholder="密码"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8160/service_ucenter/api/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import { login, getUser } from '~/api/login'
import cookie from 'js-cookie'
export default {
  layout: 'sign',
  data() {
    return {
      user: {
        mobile: '18307209812',
        password: '123456'
      },
      loginInfo: {}
    }
  },

  methods: {
    checkPhone(rule, value, callback) {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        return callback(new Error('手机号码格式不正确'))
      }
      return callback()
    },
    getUserInfo() {
      getUser().then(res => {
        const user = res.data.data.data
        cookie.set('guli_ucenter', JSON.stringify(user), { domain: 'localhost' })
        // this.$router.push({ path: '/' })
        window.location.href = '/'
      })
    },
    submitLogin() {
      const data = { ...this.user }
      login(data).then(res => {
        const { token } = res.data.data
        console.log(token)
        cookie.set('guli_token', token, { domain: 'localhost' })
        this.getUserInfo()
        // this.$message.success('登录成功!')
      })
    }
  }
}
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>
