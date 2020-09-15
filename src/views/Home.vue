<template>
  <div>
    <el-container style="height: 100%;">
      <el-header style="text-align: right; font-size: 12px">
        <header-bar></header-bar>
      </el-header>
      <el-container>
        <el-aside>
          <aside-menu></aside-menu>
        </el-aside>

        <el-main>
          <el-page-header
            @back="goBack"
            :content="$route.name"
          >
          </el-page-header>
          <router-view></router-view>
          <!-- <el-footer>
                        <footer-bar></footer-bar>
                    </el-footer> -->
        </el-main>
      </el-container>
    </el-container>
    <back-top></back-top>
  </div>
</template>

<script>
import asideMenu from "@c/common/AsideMenu.vue";
import headerBar from "@c/common/HeaderBar.vue";
// import footerbar from "@c/common/FooterBar.vue";
import backtop from "@c/common/BackTop.vue";

export default {
  name: "Home",
  components: {
    "aside-menu": asideMenu,
    "header-bar": headerBar,
    // "footer-bar": footerbar,
    "back-top": backtop,
  },

  methods: {
    goBack() { },
  },
};
</script>

<style lang="less" scoped>
@header-height: 60px;
@footer-height: 0px;
@main-height: calc(~"100vh - @{header-height} - @{footer-height}");
.el-header {
  background-color: #eff2f7;
  color: #333;
  line-height: 60px;
}
.el-aside {
  width: auto !important;
  color: #333;
  background-color: rgb(238, 241, 246);
}
.el-main {
  box-sizing: border-box;
  height: @main-height;
  overflow-y: auto;
  padding-bottom: 10px;
}
.el-footer {
  color: #333;
  background-color: #fff;
}
.el-page-header {
  margin-bottom: 50px;
}
</style>
<style>
.el-image-viewer__close {
  color: white;
}
</style>
