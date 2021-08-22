<template>
  <div class="resume">
    <div class="main-title">
      <h2>个人简历</h2>
    </div>
    <div class="main">
      <div class="basicinfo">
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
            <li v-if="$route.query.all">
              <span>联系方式：</span>
              <span>{{resumeData.basicinfo.phone }}</span>
            </li>
            <li v-if="$route.query.all">
              <span>期望薪资：</span>
              <span>面议</span>
            </li>
            <li v-if="$route.query.all">
              <span>到职日期：</span>
              <span>一个月</span>
            </li>
          </ul>
        </div>
        <el-image :src="`${$store.state.server_url}/upload/${resumeData.basicinfo.avatar}`"></el-image>
      </div>
      <div class="edu">
        <h3 class="text-l">教育背景</h3>
        <div class="plane" v-for="item in experiences" :key="item.id">
          <div class="plane-head">
            <div>{{item.theme}}</div>
            <div>{{item.dateTime | formatDateTime}}</div>
          </div>
          <div class="plane-body">
            <p>{{item.detail}}</p>
          </div>
        </div>
      </div>
      <div class="skills">
        <h3 class="text-l">掌握技能</h3>
        <el-row>
          <el-col :span="4" v-for="skill in skills" :key="skill.id">
            <progress-skill :skill="skill.name" :percentage="skill.level" />
          </el-col>
        </el-row>
      </div>
      <!-- 工作经历 -->
      <div class="jobs">
        <h3 class="text-l">工作经历</h3>
        <div class="plane" v-for="job in jobs" :key="job.id">
          <div class="plane-head">
            <div>{{job.theme}}</div>
            <div>{{job.dateTime | formatDateTime}}</div>
          </div>
          <div class="plane-body">
            <p v-html="job.detail"></p>
          </div>
        </div>
      </div>
      <!-- 项目经历 -->
      <div class="projects">
        <h3 class="text-l">项目经历</h3>
        <div class="plane" v-for="project in projects" :key="project.id">
          <div class="plane-head">
            <div>{{project.theme}}</div>
            <div>{{project.dateTime | formatDateTime}}</div>
          </div>
          <div class="plane-body">
            <p v-html="project.detail"></p>
          </div>
        </div>
      </div>
      <!-- 个人介绍 -->
      <div class="text-l">
        <h3>自我介绍</h3>
        <div class="plane">
          <p class="intro" v-html="resumeData.basicinfo.introducts"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import progressSkill from '@/components/resume/progress-skill.vue';

export default {
  name: 'resume',
  data() {
    return {
      resumeData: {},
      experiences: null,
      jobs: null,
      skills: null
    };
  },
  components: { progressSkill },
  created() {
    this.getDate();
    this.getExperiences();
    this.getJobs();
    this.getProjects();
    this.getSkills();
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
      }
    },
    async getExperiences() {
      let res = await this.$HttpApi.getExperiences();
      if (res.status === 200 && res.data.code === 1000) {
        this.experiences = res.data.data.rows;
      } else {
        this.$message.error(res.data.msg);
      }
    },

    async getJobs() {
      let res = await this.$HttpApi.getJobs();
      if (res.status === 200 && res.data.code === 1000) {
        this.jobs = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },

    async getProjects() {
      let res = await this.$HttpApi.getProjects();
      if (res.status === 200 && res.data.code === 1000) {
        this.projects = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },

    async getSkills() {
      let res = await this.$HttpApi.getSkills();
      if (res.status === 200 && res.data.code === 1000) {
        this.skills = res.data.data.sort((a, b) => {
          return b.level - a.level;
        });
      } else {
        this.$message.error(res.data.msg);
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
  max-width: 1170px;
  margin: auto;
  position: relative;
  padding: 20px;
  background-color: #fff;
  .main-title {
    height: 50px;
    h2 {
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
  align-items: center;
  .el-image {
    width: 100px;
    height: 100px;
    margin-left: 80px;
    border-radius: 50%;
  }
  .basicinfo-r {
    flex: 1;
    text-align: left;
    ul {
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
