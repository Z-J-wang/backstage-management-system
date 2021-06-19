<template>
  <el-menu
    router
    class="el-menu-vertical"
    default-active="/BMYX/product"
    :default-openeds="['2']"
    :collapse="isCollapse"
  >
    <el-menu>
      <!-- <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button> -->
      <el-button
        v-if="isCollapse"
        style="width:80%;"
        @click="isCollapse = false"
      >
        <i class="el-icon-right"></i>
      </el-button>
      <el-button
        v-else
        style="width:90%;"
        @click="isCollapse = true"
      >
        <i class="el-icon-back"></i>
      </el-button>
    </el-menu>
    <el-submenu
      v-if="auth == 0 || auth == 2"
      index="1"
    >
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">个人信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/personalInfo">基础信息</el-menu-item>
        <el-menu-item index="/edu_experience">教育经历</el-menu-item>
        <el-menu-item index="/blogs">个人博客</el-menu-item>
        <el-menu-item index="/messages">来访信件</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu
      v-if="auth == 1 || auth == 0"
      index="2"
    >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">便民优享</span>
      </template>
      <el-menu-item-group>
        <template slot="title">小程序首页</template>
        <el-menu-item index="/BMYX/product">产品列表</el-menu-item>
        <el-menu-item index="/BMYX/sort">分类列表</el-menu-item>
        <el-menu-item index="/BMYX/notice">通告栏</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu
      v-if="auth == 0"
      index="3"
    >
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">账户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/accountManagement">账户管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'aside-menu',
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          title: '个人信息管理',
          path: '',
          group: [
            {
              groupTitle: '分组一',
              groupList: [
                {
                  title: '个人基础信息',
                  path: '/PersonalInfo',
                },
                {
                  title: 'dataView',
                  path: '/tableView',
                },
                {
                  title: '测试图片压缩',
                  path: '/test',
                },
              ],
            },
          ]
        },

        {
          title: '导航二',
          path: '',
          group: [
            {
              groupTitle: '分组一',
              groupList: [
                {
                  title: '选项1',
                  path: '',
                },
                {
                  title: '选项2',
                  path: '',
                },
              ],
            },
            {
              groupTitle: '分组2',
              groupList: [
                {
                  title: '选项3',
                  path: '',
                },
              ],
            },
            {
              groupTitle: '',
              groupList: [
                {
                  title: '选项4',
                  path: '',
                },
              ],
            },
          ],
        },
      ],
      auth: 1,
    };
  },

  mounted() {
    this.auth = this.$Cookie.getCookie('auth');
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical {
  padding-top: 10px;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
