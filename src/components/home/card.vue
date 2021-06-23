<template>
  <div class="card">
    <el-image :src="mork.img"></el-image>
    <div class="content">
      <h3 class="title">
        <router-link to="/" tag="a">{{mork.title}}</router-link>
      </h3>
      <p class="intro">{{mork.intro}}</p>
      <ul class="tags">
        <li v-for="item in mork.tags" :key="item">
          <el-tag size="small" effect="plain">{{ item }}</el-tag>
        </li>
      </ul>
      <p class="datetime">发布日期：{{mork.public_time}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  data() {
    return {
      mork: {
        title: 'Vue 3 迁移策略笔记—— 第31节：scoped styles 的变化',
        intro: '本笔记主要基于官方文档《0023-scoped-styles-changes.md》汇总而来。如有理解出入，请以官方文档为主。建议您以官方文档为主，本文为辅。这样您可以“以自己为主”审视的阅读，从而不被我的观点带偏。',
        public_time: '2021/06/22',
        tags: ['Vue', 'scoped', 'Vue 3'],
        img: ''
      }
    };
  }
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;
  transition: all 0.5s;
  &:hover {
    background: #fff;
    box-shadow: #ccc 1px 1px 8px;
    border-radius: 10px;
  }
  .el-image {
    width: 160px;
    height: 160px;
    margin-right: 50px;
  }
  .content {
    flex: 1;
    height: 100%;
    text-align: left;
    .title {
      cursor: pointer;
      a {
        text-decoration: none;
        transition: all 0.5s;
        color: #8a988e;
        &:hover {
          color: #1a6840;
        }
      }
    }
    .intro {
      height: 65px;
      margin: 0;
      font-size: 14px;
      color: #2b312c;
    }
    .tags {
      margin: 10px 0;
      padding: 0;
      list-style: none;
      li {
        display: inline-block;
        padding-right: 10px;
      }
      /deep/ * {
        .el-tag--plain {
          background-color: #fff;
          border-color: #8a988e;
          color: #8a988e;
        }
      }
    }
    .datetime {
      margin: 0;
      text-align: right;
      font-size: 14px;
    }
  }
}
</style>
