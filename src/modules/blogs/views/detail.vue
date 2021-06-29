<template>
  <base-template>
    <main>
      <section>
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
            <el-tag v-for="item in categories" :key="item.id" effect="plain">{{ item.name }}</el-tag>
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
      }
    },

    change() {
      this.$nextTick(() => {
        const categories = this.$refs.mavon.$el.querySelectorAll('.v-note-panel h1,.v-note-panel h2');
        const fragment = document.createDocumentFragment();
        categories.forEach((element) => {
          console.log(element.tagName);
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
