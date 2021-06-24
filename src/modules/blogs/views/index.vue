<template>
  <base-template>
    <main>
      <section>
        <list></list>
      </section>
      <aside>
        <aside-contain>
          <span slot="title">标题</span>
          <div>内容内容内容内容内容内容</div>
        </aside-contain>
        <aside-contain>
          <span slot="title">标题</span>
          <div>内容内容内容内容内容内容</div>
        </aside-contain>
      </aside>
    </main>
  </base-template>
</template>

<script>
import asideContain from '@/modules/blogs/components/aside-contain.vue';
import list from '@/modules/blogs/components/lists.vue';
export default {
  name: 'bolgs',
  components: { asideContain, list },
  data() {
    return {};
  },
  methods: {}
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
}
</style>
