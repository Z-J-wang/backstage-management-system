<template>
    <div>
        <el-container style="height: 100%;">
            <el-header style="text-align: right; font-size: 12px">
                <header-bar></header-bar>
            </el-header>
            <el-container>
                <el-aside
                    width="200px"
                    style="background-color: rgb(238, 241, 246)"
                >
                    <aside-menu></aside-menu>
                </el-aside>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer>
                <footer-bar></footer-bar>
            </el-footer>
        </el-container>
        <back-top></back-top>
    </div>
</template>

<script>
import asideMenu from "@c/common/AsideMenu.vue";
import headerBar from "@c/common/HeaderBar.vue";
import footerbar from "@c/common/FooterBar.vue";
import backtop from '@c/common/BackTop.vue'

export default {
    components: {
        "aside-menu": asideMenu,
        "header-bar": headerBar,
        "footer-bar": footerbar,
        "back-top": backtop
    }
};
</script>

<style lang="less" scoped>
@header-height:60px;
@footer-height: 60px;
@main-height: calc(~"100vh - @{header-height} - @{footer-height}");
.el-header {
    background-color: #eff2f7;
    color: #333;
    line-height: 60px;
}
.el-aside {
    color: #333;
}
.el-main{
    box-sizing: border-box;
    height: @main-height;
    overflow-y: auto;
    padding-bottom: 10px;
}
.el-footer {
    color: #ffffff;
    background-color: #484545;
}
</style>