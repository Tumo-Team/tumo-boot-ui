<template>
  <div class="login-container">
    <div class="login-weaper animated bounceInDown">
      <div class="login-logo">
        <svg-icon icon-class="tumo-team" style="width: 74px;height: 77px;" />
      </div>
      <div class="login-tip">
        Tumo Boot
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title" />
          <a-form-model
            ref="loginForm"
            :rules="rules"
            :model="form"
          >
            <a-form-model-item prop="username">
              <a-input
                v-model="form.username"
                placeholder="Username"
                @keyup.enter.native="handleLogin"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input-password
                v-model="form.password"
                placeholder="Password"
                @keyup.enter.native="handleLogin"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item prop="captcha">
              <a-input v-model="form.captcha" placeholder="Captcha" style="display: inline-block;width: 50%;padding-right: 20px;">
                <a-icon slot="prefix" type="security-scan" />
              </a-input>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>点击更换验证码</span>
                </template>
                <img :src="'data:image/png;base64,' + captchaUrl" @click="handleCaptcha">
              </a-tooltip>
            </a-form-model-item>

            <a-form-model-item>
              <a-button
                :loading="loading"
                type="primary"
                class="login-submit"
                @click.native.prevent="handleLogin"
              >登录
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/auth'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: 'tycoding'
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        captcha: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      captchaUrl: null,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.form.username === '') {
      this.$refs.username.focus()
    } else if (this.form.password === '') {
      this.$refs.password.focus()
    }
  },
  created() {
    this.handleCaptcha()
  },
  methods: {
    handleCaptcha() {
      getCaptcha().then(res => {
        this.captchaUrl = res.data.image
        this.form.captcha_key = res.data.key
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.form)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.$notification['success']({
                message: '登录成功',
                description: '欢迎登录 Tumo-Boot'
              })
              this.loading = false
            })
            .catch(() => {
              this.handleCaptcha()
              this.form.captcha = ''
              this.loading = false
            })
        } else {
          console.apiLog('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style scoped>
.login-container {
  background-color: #f0f2f5;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: url(/img/login.png);
  -webkit-animation: animate-cloud 20s linear infinite;
  animation: animate-cloud 20s linear infinite;
}

@-webkit-keyframes animate-cloud {
  0% {
    background-position: 600px 100%;
  }
  to {
    background-position: 0 100%;
  }
}

.login-weaper {
  position: relative;
  margin: 0 auto;
  width: 380px;
  padding: 0 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
  background-color: #fff;
  border-radius: 3px;
}

.bounceInDown {
  -webkit-animation-name: bounceInDown;
  animation-name: bounceInDown;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.login-logo {
  overflow: hidden;
  width: 110px;
  height: 110px;
  margin: -50px auto 20px auto;
  border-radius: 50%;
  -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
}

.login-logo img {
  width: 70px;
  height: 70px;
}

img {
  border: 0;
}

.login-tip {
  color: #409eff;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
}

.login-border, .login-main {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.login-border {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #fff;
  background-color: #fff;
  float: left;
}

.login-main {
  margin: 0 auto;
}

.login-border, .login-main {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.login-title {
  color: #333;
  margin-bottom: 30px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
}

.login-submit {
  width: 100%;
  height: 45px;
  font-size: 18px;
  letter-spacing: 5px;
  text-indent: 5px;
  font-weight: 300;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  font-family: neo;
  -webkit-transition: .25s;
  transition: .25s;
}
</style>
