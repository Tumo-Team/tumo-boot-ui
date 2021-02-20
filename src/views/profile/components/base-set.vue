<template>
  <div class="view-container">
    <div class="view-left">
      <a-form-model
        ref="form"
        :rules="rules"
        :model="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item has-feedback prop="username" label="登录账户">
          <a-input v-model="form.username" />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="realName" label="真实姓名">
          <a-input v-model="form.realName" />
        </a-form-model-item>
        <a-form-model-item prop="sex" label="性别">
          <a-select v-model="form.sex" placeholder="请选择性别">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback prop="phone" label="联系电话">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item prop="email" label="个人邮箱">
          <a-input v-model="form.email" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleEdit">
            修改信息
          </a-button>
        </a-form-model-item>
      </a-form-model>

      <a-form-model
        ref="passForm"
        :model="passForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
        :rules="{password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                 repass: [{ required: true, message: '请再次输入', trigger: 'blur' }]}"
      >
        <a-form-model-item has-feedback prop="password" label="变更密码">
          <a-input v-model="passForm.password" type="password" />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="repass" label="再次输入">
          <a-input v-model="passForm.repass" type="password" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleEditPass">
            修改密码
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
    <div class="view-right">
      <a-row>头像</a-row>
      <div class="view-right-img">
        <a-avatar :src="form.avatar === null ? '/avatar/default.png' : form.avatar" :size="144" />
      </div>
      <div class="view-right-btn">
        <a-upload
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleUploadChange"
        >
          <a-button>
            <a-icon type="upload" />
            修改头像
          </a-button>
        </a-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkUserName, updateUser, resetPass } from '@/api/modules/upms/user'

export default {
  name: 'BaseSet',
  data() {
    const validateName = (rule, value, callback) => {
      if (value === undefined || value.trim() === '') {
        callback(new Error('请输入账户名'))
      } else {
        checkUserName(this.form).then(res => {
          if (!res.data) {
            callback('当前名称已存在')
          }
          callback()
        })
      }
    }
    return {
      form: {},
      passForm: {},
      rules: {
        username: [{ required: true, validator: validateName, trigger: 'blur' }],
        relaName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        email: [{ type: 'email', required: false, message: '请输入正确的邮箱地址', trigger: 'blur' }],
        phone: [{ pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
          required: true, message: '请输入电话号', trigger: 'blur' }]
      },
      headers: {}
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    this.form = this.user
  },
  methods: {
    handleEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 修改
          updateUser(this.form).then(res => {
            if (res.code === 200) {
              this.$message.success('修改成功')
              window.location.reload()
            }
          })
        } else {
          this.$message.error('请填写表单内容')
          return false
        }
      })
    },
    handleEditPass() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          if (this.passForm.password !== this.passForm.repass) {
            this.$message.error('两次输入密码不一致')
            return false
          }
          this.passForm.id = this.form.id
          resetPass(this.passForm).then(res => {
            if (res.code === 200) {
              this.$message.success('修改成功')
              this.$store.dispatch('user/logout').then(res => {
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
              })
            }
          })
        } else {
          this.$message.error('请填写表单内容')
          return false
        }
      })
    },
    // 文件上传前
    beforeUpload(file) {
      this.uploadLoading = true
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('请上传JPG或PNG格式文件')
      }
      return isJpgOrPng
    },
    // 文件上传后
    handleUploadChange(info) {
      this.uploadLoading = false
      console.apiLog(info)
    }
  }
}
</script>

<style lang="less" scoped>
  .view-container {
    display: flex;
    padding-top: 12px;

    .view-left {
      min-width: 400px;
      max-width: 548px;
    }

    .view-right {
      flex: 1 1;
      padding-left: 104px;

      .view-right-img {
        width: 144px;
        height: 144px;
        margin-bottom: 12px;
        overflow: hidden;
      }

      .view-right-btn {
        display: inline-block;
        width: 144px;
        text-align-last: center;
      }
    }
  }

</style>
