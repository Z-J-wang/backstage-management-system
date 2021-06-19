<template>
  <div class="md-editor">
    <div class="toolbar-top">
      <router-link to="/">
        <el-button round icon="el-icon-arrow-left">返回</el-button>
      </router-link>
      <el-input placeholder="文章标题" v-model="title"></el-input>
      <el-button type="primary" round @click="save">保存</el-button>
    </div>
    <mavon-editor
      class="mavon"
      v-model="content"
      :toolbars="toolbars"
    ></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'md-editor',
  data() {
    return {
      title: '',
      content: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  components: {
    mavonEditor
  },
  mounted() {},
  methods: {
    async save() {
      if (!this.title) {
        this.$message.warning('请输入标题');
        return false;
      }

      if (!this.content) {
        this.$message.warning('文章内容不能为空');
        return false;
      }

      const params = {
        title: this.title,
        content: this.content
      };
      const res = await this.$HttpApi.createArticle(params);
      console.log(res);
    }
  }
};
</script>

<style lang="less">
.md-editor {
  .toolbar-top {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
    padding: 0 20px;
    .el-input {
      flex: 1;
      margin: 0 10px;
      .el-input__inner {
        border-radius: 20px;
      }
    }
  }
  .mavon {
    width: calc(100vw - 40px);
    height: calc(100vh - 130px);
    margin: 0 auto;
  }
}
</style>
