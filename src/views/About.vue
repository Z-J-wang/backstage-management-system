<template>
  <base-template>
    <div class="about">
      <div class="website">
        <h2>网站介绍</h2>
        <el-divider></el-divider>
        <div class="intro">
          您好呀！我是 Jay！(●ˇ∀ˇ●)
          <br />我是网站的开发和维护者。本网站是我的个人网址，用于知识的分享、学习与交流。
          <br />网站内的全部文章您可以免费阅读、自由分享、转载、引用。
          <br />本网站是我个人独立完成，使用过程中可能存在 bug 以及较差的体验点，请见谅。(○｀ 3′○)
          <br />
          <h3>开发相关介绍：</h3>
          本网站采用前后端分离的形式进行开发的。<br />
          网站前端基于 vue-cli 3.0 进行开发，同时采用了 element-ui、less、mavon-editor 等第三方插件。
          <br />网站后端基于 node.js 开发，采用的是 koajs + mysql + sequelize 基础框架，项目结构上模拟了“三层架构”，共分为 Model(实体层)、Dal(数据操作层)、Bll(业务逻辑层)以及 Routes(路由层)。Web 服务器采用的是 nginx 。
          <br/>如果您对网站的源码感兴趣可以通过以下途径获取：
          <ul>
            <li>前端源码：</li>
            <li>后端源码：</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>个人简历</h2>
        <el-divider></el-divider>
      </div>
    </div>
  </base-template>
</template>

<style lang="less">
.about {
  width: 1180px;
  margin: 40px auto;
  .intro {
    text-align: left;
  }
}
</style>
