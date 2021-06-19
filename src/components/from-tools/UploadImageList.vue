<template>
  <el-upload
    ref="uploadList"
    class="text-l"
    list-type="picture"
    :limit="limit"
    :action="action"
    :auto-upload="false"
    :file-list="fileList"
    :on-change="change"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
  >
    <el-button
      type="primary"
      size="small"
    >点击上传</el-button>
    <div
      class="el-upload__tip"
      slot="tip"
    >
      <p>1. 只能上传 jpg / jpeg / png 文件，且不超过 500 kb；</p>
      <p>2. 建议上传图片的长宽比为1.5 : 1；</p>
    </div>
  </el-upload>
</template>

<script>
export default {
  name: 'upload-image-list',
  props: {
    action: {
      type: String,
    },

    imageUrlList: {
      type: Array,
    },
  },

  data() {
    return {
      fileList: [],
      limit: 4,
    };
  },

  watch: {
    imageUrlList(list) {
      this.fileList = [];

      list.forEach((element) => {
        this.fileList.push({
          name: element,
          url: `${this.$store.state.server_url}/upload/${element}`,
        });
      });
    },
  },

  mounted() {
    this.imageUrlList.forEach((element) => {
      this.fileList.push({
        name: element,
        url: `${this.$store.state.server_url}/upload/${element}`,
      });
    });
  },

  methods: {
    change(file, fileList) {
      const typeList = ['image/jpeg', 'image/png', 'image/jpg'];
      const isLt2M = file.raw.size / 1024 / 1024 < 0.5;
      if (typeList.indexOf(file.raw.type) < 0) {
        this.$message.error('上传图片只能是 jpg / png / jpeg 格式!');
        fileList.pop();
        this.fileList = fileList;

        return false;
      }

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500 kb!');
        fileList.pop();
        this.fileList = fileList;

        return false;
      }
      this.$refs['uploadList'].submit();
    },

    handleExceed() {
      this.$message({
        message: `一个商品只能添加${this.limit}张图片。`,
        type: 'warning',
      });
    },

    handleSuccess(res, file, fileList) {
      console.log(fileList);
      console.log(res);
      fileList.forEach((element) => {
        if (element.response) {
          element.name = element.response.data;
          this.imageUrlList.push(element.response.data);
        }
      });
      this.$emit('updateImgSrcList', this.imageUrlList);
    },

    handleRemove(file) {
      this.$emit('delUploadImage', file.name);
    },
  },
};
</script>

<style scoped>
.el-upload__tip {
  line-height: 15px;
}
</style>

