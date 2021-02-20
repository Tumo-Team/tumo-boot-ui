<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <Screenfull />
      <a-spin class="avatar-wrapper" :spinning="spinning">
        <a-dropdown v-if="user" placement="bottomRight">
          <span class="avatar-wrapper">
            <a-avatar size="small" :src="user.avatar ? user.avatar : '/avatar/default.png'" class="avatar-img" />
            <span class="avatar-name">{{ user.username }}</span>
          </span>
          <template v-slot:overlay>
            <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
              <a-menu-item key="github" @click="handleGithub">
                <a-icon type="github" />
                GitHub
              </a-menu-item>
              <a-menu-item key="blog" @click="handleBlog">
                <a-icon type="link" />
                个人博客
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="profile" @click="handleProfile">
                <a-icon type="setting" />
                个人信息
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" @click="logout">
                <a-icon type="logout" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-spin>
      <a class="right-menu-github" href="https://github.com/Tumo-Team/Tumo-Boot" target="_blank">
        <a-dropdown v-if="user.username">
          <span class="avatar-wrapper">
            <a-icon type="github" :style="{ fontSize: '20px'}" />
          </span>
          <template v-slot:overlay />
        </a-dropdown>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      spinning: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user'
    ])
  },
  mounted() {
    this.spinning = false
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleGithub() {
      window.open('https://github.com/TyCoding', '_blank')
    },
    handleBlog() {
      window.open('http://tycoding.cn', '_blank')
    },
    handleProfile() {
      this.$router.push('/profile/index')
    },
    logout() {
      this.$confirm({
        title: '提示',
        content: '你确定要注销当前账户？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.$store.dispatch('user/logout').then(res => {
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          })
        },
        onCancel: () => {
          this.$message.info('已取消注销登录', 3)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 64px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-wrapper {
      display: inline-block;
      height: 100%;
      padding: 0 12px;
      cursor: pointer;
      -webkit-transition: all .3s;
      transition: all .3s;
      line-height: 64px;
      vertical-align: top;

      &:hover {
        background: rgba(0, 0, 0, .025);
      }

      .avatar-img {
        margin: 12px 8px 12px 0;
      }

      .avatar-name {
        font-size: 16px !important;
        vertical-align: -.125em;
      }
    }

    .right-menu-github {
      margin-right: 12px;
    }
  }
}
</style>
