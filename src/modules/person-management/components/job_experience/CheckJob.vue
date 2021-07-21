<template>
  <el-drawer
    direction="ltr"
    title="工作经历详情"
    :visible.sync="drawerVisible"
    :before-close="handleClose"
  >
    <el-row>
      <el-col :span="8">公司名称：</el-col>
      <el-col class="text-l" :span="16">{{ item.theme }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">时间：</el-col>
      <el-col
        class="text-l"
        :span="16"
      >{{ item.dateTime.length > 1 ? item.dateTime.join(" 至 ") : ""}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">详情：</el-col>
      <el-col class="text-l text-indent-cn" :span="16">
        <p v-html="item.detail"></p>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: 'check-experience',
  props: {
    drawerVisible: {
      type: Boolean,
      default: false
    },

    item: {
      type: Object
    }
  },

  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 50px;
  padding: 0 30px;
}
</style>
