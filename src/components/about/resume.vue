<template>
  <div class="resume">
    <div class="main-title">
      <h1>个人简历</h1>
    </div>
    <div class="main">
      <div class="basicinfo">
        <el-image :src="`${$store.state.server_url}/upload/${resumeData.basicinfo.avatar}`"></el-image>
        <div class="basicinfo-r">
          <h3>基本信息</h3>
          <ul>
            <li>
              <span>姓名：</span>
              <span>{{resumeData.basicinfo.name}}</span>
            </li>
            <li>
              <span>邮箱：</span>
              <span>{{resumeData.basicinfo.email}}</span>
            </li>
            <li>
              <span>性别：</span>
              <span>{{resumeData.basicinfo.gender | formatGender}}</span>
            </li>
            <li>
              <span>现居地：</span>
              <span>{{resumeData.basicinfo.presentAddress | formatAddress}}</span>
            </li>
          </ul>
          <!-- 个人介绍 -->
          <h3>自我介绍</h3>
          <p class="intro">{{resumeData.basicinfo.introducts}}</p>
        </div>
      </div>
      <div class="edu">
        <h3 class="text-l">教育背景</h3>
        <div class="plane">
          <div class="plane-head">
            <div>XX学校</div>
            <div>2015-9 至 2019-7</div>
          </div>
          <div class="plane-body">
            <p>江户时代会计核算的付款就会受到</p>
          </div>
        </div>
      </div>
      <!-- 工作经历 -->
      <div class="jobs">
        <h3 class="text-l">工作经历</h3>
        <div class="plane" v-for="job in resumeData.jobs" :key="job.id">
          <div class="plane-head">
            <div>{{job.theme}}</div>
            <div>{{job.dateTime | formatDateTime}}</div>
          </div>
          <div class="plane-body">
            <p>{{job.detail}}</p>
          </div>
        </div>
      </div>
      <!-- 项目经历 -->
      <div class="projects">
        <h3 class="text-l">项目经历</h3>
        <div class="plane" v-for="job in resumeData.projects" :key="job.id">
          <div class="plane-head">
            <div>{{job.theme}}</div>
            <div>{{job.dateTime | formatDateTime}}</div>
          </div>
          <div class="plane-body">
            <p>{{job.detail}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resume',
  data() {
    return {
      resumeData: {}
    };
  },
  created() {
    this.getDate();
  },
  filters: {
    formatAddress(address) {
      return address.join(' - ');
    },
    formatGender(gender) {
      return gender === true ? '男' : '女';
    },
    formatDateTime(dataTime) {
      return dataTime.join(' 至 ');
    }
  },
  methods: {
    async getDate() {
      const { data: res } = await this.$HttpApi.getResume();
      if (res.code === 1000) {
        this.resumeData = res?.data;
        console.log(this.resumeData);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@mainColor: #5270af;
@textMainColor: #333;
@textSubColor: #666;
@borderColor: #999;

.resume {
  position: relative;
  padding: 20px;
  background-color: #fff;
  .main-title {
    height: 50px;
    h1 {
      position: absolute;
      left: 0;
      width: 600px;
      margin: 0;
      padding-left: 20px;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      line-height: 50px;
      color: #ffffff;
      text-align: left;
      background-color: @mainColor;
    }
  }
  .main {
    padding: 20px;
    & > div {
      margin-bottom: 60px;
    }
  }
  h3 {
    position: relative;
    padding-left: 10px;
    line-height: 36px;
    border-bottom: 1px solid #999;
    color: @textMainColor;
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 100px;
      border-bottom: 3px solid @mainColor;
      left: 0;
      bottom: -2px;
    }
  }
}
.basicinfo {
  display: flex;
  flex-direction: row-reverse;
  .el-image {
    width: 200px;
    height: 200px;
    margin-left: 80px;
    border-radius: 50%;
  }
  .basicinfo-r {
    flex: 1;
    text-align: left;
    ul {
      width: 600px;
      list-style: none;
      padding-left: 10px;
      li {
        display: inline-block;
        width: 50%;
        margin-bottom: 20px;
      }
    }
    .intro {
      text-indent: 20px;
    }
  }
}
.plane {
  text-align: left;
  margin-bottom: 30px;
  padding: 0 10px;
  .plane-head {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: @textMainColor;
  }
}
</style>
