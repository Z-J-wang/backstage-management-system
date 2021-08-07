<template>
  <el-upload
    class="avatar-uploader"
    :data="oldSrc"
    :headers="headers"
    :action="action"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img
      v-if="mutableImageUrl"
      class="avatar"
      :src="`${$store.state.server_url}/upload/${mutableImageUrl}`"
      :style="{width:width+ 'px', height:height+ 'px'}"
    />
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
      :style="{width:width+ 'px', height:height+ 'px', lineHeight:height+ 'px'}"
    ></i>
  </el-upload>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    imageUrl: {
      type: String
    },

    action: {
      type: String
    },

    width: {
      type: String,
      default: '178'
    },

    height: {
      type: String,
      default: '178'
    }
  },

  data() {
    return {
      mutableImageUrl: this.imageUrl,
      oldSrc: {
        oldImgSrc: ''
      },
      headers: {
        Authorization: this.$Cookie.getToken()
      }
    };
  },

  watch: {
    imageUrl() {
      this.mutableImageUrl = this.imageUrl;
    }
  },

  methods: {
    handleAvatarSuccess(res) {
      this.mutableImageUrl = res.data;
      this.$emit('updateImgSrc', this.mutableImageUrl);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
