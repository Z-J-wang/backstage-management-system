import Vue from 'vue';
import customConfirmVue from '@/modules/case-show/modules/messageBox/components/messageBox.vue';

const CustomConfirm = Vue.extend(customConfirmVue); // 直接将Vue组件作为Vue.extend的参数

const customConfirm = (message, config, callback) => {
  return new Promise((resolve, reject) => {
    const customConfirm = new CustomConfirm({
      data: {
        message: message,
        confirmButtonText: config?.confirmButtonText,
        cancelButtonText: config?.cancelButtonText,
        type: config?.type,
        callback: callback
      }
    });
    customConfirm.vm = customConfirm.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
    customConfirm.dom = customConfirm.vm.$el;
    document.body.appendChild(customConfirm.dom); // 将dom插入body

    customConfirm.callback = ret => {
      if (ret === true) {
        resolve();
      } else if (ret === false) {
        reject();
      }
    };
  });
};

export default {
  install: Vue => {
    Vue.prototype.$customConfirm = customConfirm; // 将组件暴露出去，并挂载在Vue的prototype上
  }
};
