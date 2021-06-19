<template>
  <el-drawer
    direction="ltr"
    title="信息详情展示"
    :before-close="handleClose"
    :visible.sync="drawerVisible"
  >
    <el-row class="text-l">
      <el-col :span="8">发信人：</el-col>
      <el-col :span="16">{{ item.name }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">发送时间：</el-col>
      <el-col :span="16">{{ item.datetime }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">邮箱：</el-col>
      <el-col :span="16">{{ item.email }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">个人网站：</el-col>
      <el-col :span="16">
        <el-link
          type="primary"
          target="_blank"
          :href="item.website"
        >{{item.website}}</el-link>
      </el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">主题：</el-col>
      <el-col :span="16">{{ item.subject }}</el-col>
    </el-row>
    <el-row class="text-l">
      <el-col :span="8">内容:</el-col>
      <el-col
        class="text-indent-cn"
        :span="16"
      >{{ item.content }}</el-col>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: 'check-message',
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
