<template>
  <div>
    <h2>Grid 布局展示</h2>
    <div class="contain">
      <ul
        class="show grid"
        :style="style"
      >
        <li
          v-for="i in 10"
          :key="i"
        >
          {{i}}
        </li>
      </ul>
      <div class="setting">
        <div>
          <describe-setting
            v-for="attr in Object.values(attrs)"
            :key="attr.name"
            :describe="attr.describe"
            :name="attr.name"
            v-model="attr.value"
          ></describe-setting>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import describeSetting from '@/components/describe-setting/index.vue';
export default {
  name: 'grid',
  components: { describeSetting },
  computed: {
    style() {
      let style = Object.values(this.attrs).map((attr) => {
        return `${attr.name}:${attr.value}`;
      });
      return style.join(';');
    }
  },
  data() {
    return {
      attrs: {
        gridTemplateColumns: {
          name: 'grid-template-columns',
          describe: '每列的宽度',
          value: '1fr 100px 1fr 1fr'
        },
        gridTemplateRows: {
          name: 'grid-template-rows',
          describe: '每行的高度',
          value: '1fr 100px 1fr 1fr'
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.contain {
  display: grid;
  grid-template-columns: [show] 50% [setting] 50%;
  ul {
    width: 600px;
    // height: 600px;
    margin: 40px auto;
    padding: 20px;
    list-style: none;
    border: 1px solid #000000;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eee;
    }
  }
}
.grid {
  display: grid;
}
</style>
