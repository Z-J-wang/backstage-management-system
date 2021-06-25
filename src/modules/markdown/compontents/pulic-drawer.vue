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
        <el-button class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        <div class="tag-contain">
          <p>可以添加标签: {{ 4 - pulicData.tags.length }} 个</p>
          <el-input v-model="neweTag" size="small" placeholder="新增标签" @keyup.native.enter="addTag"></el-input>
          <div>
            <el-tag
              :key="tag"
              v-for="(tag,i) in allTags"
              :disable-transitions="false"
              @click="selecTag(i)"
            >{{tag}}</el-tag>
          </div>
        </div>
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
        tags: ['标签一', '标签一']
      },
      pulicDataRule: {},
      neweTag: '',
      allTags: ['标签一', '标签一', '标签一', '标签一', '标签一', '标签一', '标签一', '标签一']
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
    },
    addTag() {
      if (4 - this.pulicData.tags.length) {
        this.pulicData.tags.push(this.neweTag);
      } else {
        this.$message.warning('最多可以添加 4 个标签');
      }
    },
    selecTag(index) {
      if (4 - this.pulicData.tags.length) {
        this.pulicData.tags.push(this.allTags[index]);
      } else {
        this.$message.warning('最多可以添加 4 个标签');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding: 20px;
  text-align: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
}
.tag-contain {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 5px;
  p {
    margin: 0;
    padding-bottom: 15px;
    font-size: 14px;
    line-height: 14px;
  }
  .el-tag {
    margin: 0 5px;
    cursor: pointer;
  }
}
</style>
