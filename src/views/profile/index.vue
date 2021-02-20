<template>
  <div class="app-container page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="user.avatar === null ? '/avatar/default.png' : user.avatar">
            </div>
            <div class="username">{{ user.username }}</div>
            <div class="bio">{{ user.email }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="title" />{{ dept === null ? '暂无':dept.name }}
            </p>
            <p>
              <i class="group" />
              <a-tag v-for="role in roles" :key="role.id" color="green">{{ role.name }}</a-tag>
            </p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card style="width:100%" :bordered="false">
          <base-set />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import BaseSet from './components/base-set'

export default {
  components: {
    BaseSet
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['user', 'roles', 'dept'])
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .page-header-wrapper-grid-content-main {
    width: 100%;
    height: 100%;
    min-height: 100%;
    transition: 0.3s;

    .account-center-avatarHolder {
      text-align: center;
      margin-bottom: 24px;

      & > .avatar {
        margin: 0 auto;
        width: 104px;
        height: 104px;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }

      .username {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 4px;
      }
    }

    .account-tags{
      .account-tags-title{
        margin-bottom: 12px;
        color: rgba(0,0,0,.85);
        font-weight: 500;
      }
    }

    .account-center-detail {
      p {
        margin-bottom: 8px;
        padding-left: 26px;
        position: relative;
      }

      i {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 0;
        top: 4px;
        background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
      }

      .title {
        background-position: 0 0;
      }
      .group {
        background-position: 0 -22px;
      }
      .address {
        background-position: 0 -44px;
      }
    }
  }
</style>
