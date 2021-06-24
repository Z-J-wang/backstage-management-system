<template>
  <el-drawer title="完善文章信息" :visible.sync="drawer" direction="rtl" @closed="handleClose">
    <el-form v-model="pulicData" ref="pulicData" :rules="pulicDataRule" label-width="100px">
      <el-form-item label="文章标签：" prop="type">
        <el-tag
          :key="tag"
          v-for="(tag,i) in pulicData.tags"
          closable
          :disable-transitions="false"
          @close="delTag(i)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="分类：" prop="type">
        <el-select></el-select>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  name: 'public-drawer',
  props: {
    visible: {
      typr: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: this.visible,
      pulicData: {
        tags: ['标签一', '标签一', '标签一']
      },
      pulicDataRule: {}
    };
  },
  watch: {
    visible() {
      this.drawer = this.visible;
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    delTag(index) {
      this.pulicData.tags.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.el-form{
  padding: 20px;
  text-align: left;
}
</style>
