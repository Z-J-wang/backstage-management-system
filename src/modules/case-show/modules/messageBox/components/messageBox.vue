<template>
  <div v-if="visible" id="custom-confirm" class="custom-confirm">
    <div class="contain">
      <header>
        <i class="close el-icon-close" @click="close"></i>
      </header>
      <main>
        <div></div>
        <div class="content" v-html="message"></div>
      </main>
      <footer>
        <el-button v-if="cancelButtonText" @click="close">{{cancelButtonText}}</el-button>
        <el-button v-if="confirmButtonText" type="primary" @click="confirm">{{confirmButtonText}}</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'custom-confirm',
  data() {
    return {
      visible: true,
      message: '',
      confirmButtonText: '取消',
      cancelButtonText: '确认',
      type: 'warning',
      callback: null
    };
  },
  created() {
    document.body.classList.add('custom-confirm-srcoll-hideen');
  },
  destroyed() {
    document.body.classList.remove('custom-confirm-srcoll-hideen');
  },
  methods: {
    close() {
      this.visible = false;
      this.callback && this.callback(false);
      this.$nextTick(() => {
        this.$destroy(this);
      });
    },
    confirm() {
      this.visible = false;
      this.callback && this.callback(true);
      this.$nextTick(() => {
        this.$destroy(this);
      });
    }
  }
};
</script>
<style lang="less">
.custom-confirm-srcoll-hideen {
  overflow: hidden;
}
.custom-confirm {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background-color: #000000a6;
  .contain {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 240px;
    border-radius: 4px;
    border-radius: 4px;
    background-color: #ffffff;
    header {
      text-align: right;
      padding: 5px;
      .close {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        font-weight: bold;
        cursor: pointer;
        &:hover,
        &:focus {
          background: #1367dacc;
          border-radius: 4px;
          color: #1367da;
        }
      }
    }
    main {
      display: flex;
      width: 100%;
      max-height: 127px;
      overflow-y: hidden;
      padding: 30px 40px;
      box-sizing: border-box;
      & > div:first-child {
        width: 40px;
        height: 40px;
        background-color: indianred;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 350px;
        min-height: 40px;
        padding-left: 16px;
        text-align: left;
        font-size: 14px;
        color: #999999;
        & * {
          width: 100%;
        }
      }
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 67px;
      padding: 13px 16px;
      text-align: right;
      box-sizing: border-box;
    }
  }
}
</style>
