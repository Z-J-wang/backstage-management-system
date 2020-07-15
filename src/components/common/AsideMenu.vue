<template>
    <el-menu
        :default-openeds="['1']"
        router
        default-active="/edu_experience"
        class="el-menu-vertical"
        :collapse="isCollapse"
    >
        <el-menu>
            <!-- <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button> -->
            <el-button v-if="isCollapse" @click="isCollapse = false" style="width:80%;">
                <i class="el-icon-right"></i>
            </el-button>
            <el-button v-else @click="isCollapse = true" style="width:90%;">
                <i class="el-icon-back"></i>
            </el-button>
        </el-menu>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">个人信息管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/personalInfo">基础信息</el-menu-item>
                <el-menu-item index="/edu_experience">教育经历</el-menu-item>
                <el-menu-item index="/test">测试压缩</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "aside-menu",
    data() {
        return {
            isCollapse: false,
            menuList: [
                {
                    title: "个人信息管理",
                    path: "",
                    group: [
                        {
                            groupTitle: "分组一",
                            groupList: [
                                {
                                    title: "个人基础信息",
                                    path: "/PersonalInfo"
                                },
                                {
                                    title: "dataView",
                                    path: "/tableView"
                                },
                                {
                                    title: "测试图片压缩",
                                    path: "/test"
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "导航二",
                    path: "",
                    group: [
                        {
                            groupTitle: "分组一",
                            groupList: [
                                {
                                    title: "选项1",
                                    path: ""
                                },
                                {
                                    title: "选项2",
                                    path: ""
                                }
                            ]
                        },
                        {
                            groupTitle: "分组2",
                            groupList: [
                                {
                                    title: "选项3",
                                    path: ""
                                }
                            ]
                        },
                        {
                            groupTitle: "",
                            groupList: [
                                {
                                    title: "选项4",
                                    path: ""
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
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