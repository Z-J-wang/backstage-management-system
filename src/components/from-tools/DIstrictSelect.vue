<template>
  <el-cascader
    :id="id"
    clearable
    filterable
    style="width:100%"
    :name="name"
    :size="size"
    :value="district"
    :options="options_area"
    :props="{ label:'name',children:'cities',value:'name' }"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import city from "../../../public/chinaProvince";

export default {
  name: "DistrictSelect",

  // 自定义组件实现v-model
  model: {
    prop: "district",
    event: "returnBack",
  },

  props: {
    size: {
      type: String,
      default: "medium", // medium / small / mini
    },

    width: {
      type: Number,
    },

    district: {
      type: Array,
    },

    id: {
      type: String,
    },

    name: {
      type: String,
    },
  },

  data() {
    return {
      value: [],
      options_area: city.provinces,
    };
  },

  methods: {
    handleChange(value) {
      this.$emit("returnBack", value);
    },
  },
};
</script>
