<template>
    <el-drawer
        title="详情"
        direction="ltr"
        :visible.sync="drawerVisible"
        :before-close="handleClose"
    >
        <el-row class="text-l">
            <el-col :span="8">菜名：</el-col>
            <el-col :span="16">{{ item.name }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">类别：</el-col>
            <el-col :span="16">{{ item.sort }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">今天价格</el-col>
            <el-col :span="16">{{ item.nowPrice }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">昨天价格</el-col>
            <el-col :span="16">{{ item.oldPrice }}</el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">图片:</el-col>
            <el-col :span="16">
                <el-image
                    :src="item.imgSrc"
                    :preview-src-list="[item.imgSrc]"
                ></el-image>
            </el-col>
        </el-row>
        <el-row class="text-l">
            <el-col :span="8">介绍:</el-col>
            <el-col
                :span="16"
                class="text-indent-en"
            >{{ item.detail }}</el-col>
        </el-row>
    </el-drawer>
</template>

<script>
export default {
    name: "item-check",
    props: {
        drawerVisible: {
            type: Boolean,
            default: false,
        },
        item: {
            type: Object,
        },
    },
    methods: {
        handleClose() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 50px;
    padding: 0 30px;
}
</style>