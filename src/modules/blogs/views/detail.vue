<template>
  <base-template>
    <main>
      <section>
        <div class="head">
          <h1>{{artilce.title}}</h1>
          <div class="details">
            <p>
              文章分类：
              <span class="category" @click="goTo(artilce.category)">{{ artilce.category }}</span>
            </p>
            <p>浏览量：{{ artilce.pageViews }}</p>
            <p>发布时间：{{ artilce.updatedAt }}</p>
            <p>发布时间：{{ artilce.ban }}</p>
            <div class="edit" v-if="$store.state.userinfo.account">
              <span @click="goToEdit()">编辑</span> |
              <span v-if="!artilce.ban" @click="ban()">禁用</span>
              <span v-else @click="unban()">解禁</span>
            </div>
          </div>
        </div>
        <mavon-editor
          class="mavon"
          ref="mavon"
          v-model="artilce.content"
          defaultOpen="preview"
          :boxShadow="false"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false"
          @change="change"
        ></mavon-editor>
      </section>
      <aside>
        <aside-contain>
          <span slot="title">目录</span>
          <div class="catalogue"></div>
        </aside-contain>
        <aside-contain>
          <span slot="title">文章分类</span>
          <div>
            <el-tag
              v-for="item in categories"
              :key="item.id"
              effect="plain"
              @click="goTo(item.name)"
            >{{ item.name }}</el-tag>
          </div>
        </aside-contain>
      </aside>
    </main>
  </base-template>
</template>

<script>
import asideContain from '@/modules/blogs/components/aside-contain.vue';
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  name: 'bolgs',
  components: { asideContain, mavonEditor },
  data() {
    return {
      artilce: {},
      allTags: [],
      categories: []
    };
  },
  created() {
    if (!this.$route.params.id) {
      this.$message.warning('缺少文章ID');
      this.$router.push('/');
    }
    this.getTags();
    this.getCategories();
    this.getArticlesByID();
  },
  methods: {
    goTo(name) {
      this.$router.push({
        name: 'blog-list',
        params: {
          category: name
        }
      });
    },

    goToEdit() {
      this.$router.push({
        name: 'markdown',
        query: {
          id: this.artilce.id,
          type: 'edit'
        }
      });
    },

    /**
     * 获取已存在的标签
     */
    async getTags() {
      const { data: res } = await this.$HttpApi.getTags();
      if (res?.code === 1000) {
        this.allTags = res.data;
      }
    },

    /**
     * 获取已存在的文章分类
     */
    async getCategories() {
      const { data: res } = await this.$HttpApi.getCategories();
      if (res?.code === 1000) {
        this.categories = res.data;
      }
    },

    /**
     * 根据 ID 获取文章
     */
    async getArticlesByID() {
      const { data: res } = await this.$HttpApi.getArticlesByID(this.$route.params.id);
      if (res?.code === 1000) {
        this.artilce = res.data;
        this.artilce.pageViews++;
        this.$HttpApi.pageViewAutoIncre(this.artilce.id);
      }
    },

    // 文章禁用
    async ban() {
      const { data: res } = await this.$HttpApi.ban(this.$route.params.id);
      if (res?.code == 1000) {
        this.$message.success(res.msg);
        this.getArticlesByID();
      } else if (res.code == 5000) {
        this.$message.error(res.msg);
      }
    },

    // 文章解禁
    async unban() {
      const { data: res } = await this.$HttpApi.unban(this.$route.params.id);
      if (res?.code == 1000) {
        this.$message.success(res.msg);
        this.getArticlesByID();
      } else if (res.code == 5000) {
        this.$message.error(res.msg);
      }
    },

    change() {
      this.$nextTick(() => {
        const categories = this.$refs.mavon.$el.querySelectorAll('.v-note-panel h1,.v-note-panel h2');
        const fragment = document.createDocumentFragment();
        categories.forEach((element) => {
          let elem = null;
          if (element.tagName === 'H2') {
            elem = document.createElement('h2');
          } else if (element.tagName === 'H1') {
            elem = document.createElement('h1');
          }
          elem.innerHTML = element.innerText;
          fragment.appendChild(elem);
        });

        document.querySelector('.catalogue').appendChild(fragment);
      });
    }
  }
};
</script>

<style lang="less" scoped>
main {
  position: relative;
  width: 1180px;
  margin: 0 auto;
  padding: 10px 0 40px 0;
  .head {
    margin: 0 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #2c3e50;
    h1 {
      margin: 0;
      padding: 30px 0 20px 0;
      font-size: 1.7rem;
    }
    .details {
      position: relative;
      padding: 15px 10px;
      text-align: left;
      font-size: 14px;
      background-color: #f8f4ed;
      border-radius: 5px;
      p {
        margin: 5px;
      }
      .category {
        cursor: pointer;
        &:hover {
          color: #869d9d;
        }
      }
      .edit {
        position: absolute;
        bottom: 15px;
        right: 20px;
        cursor: pointer;
        & span:hover {
          color: #869d9d;
        }
      }
    }
  }
  section {
    width: 880px;
    border-radius: 5px;
    background-color: #fff;
  }
  aside {
    position: absolute;
    top: 10px;
    right: 0;
    width: 270px;
    border-radius: 5px;
  }
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
.catalogue {
  font-size: 14px;
  /deep/ h2 {
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
