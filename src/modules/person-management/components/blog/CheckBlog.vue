<template>
  <el-drawer
    direction="ltr"
    title="博客详情"
    :visible.sync="drawerVisible"
    :before-close="handleClose"
  >
    <el-row class="text-l">
      <el-col :span="8">博客标题：</el-col>
      <el-col :span="16">{{ item.title }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">发布时间：</el-col>
      <el-col :span="16">{{ item.publishTime }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">博客链接：</el-col>
      <el-col :span="16">
        <el-link
          type="primary"
          target="_blank"
          :href="item.href"
        >{{item.href}}</el-link>
      </el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">博客介绍图片:</el-col>
      <el-col :span="16">
        <p class="line-break">{{ item.imgSrc }}</p>
        <el-image
          :src="item.imgSrc"
          :preview-src-list="[item.imgSrc]"
        ></el-image>
      </el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">博客摘要:</el-col>
      <el-col
        class="text-indent-en"
        :span="16"
      >{{ item.digest }}</el-col>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: 'check-blog',
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
      this.$emit('close');
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
