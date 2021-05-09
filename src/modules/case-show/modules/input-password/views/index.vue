<template>
	<div>
    <h3>密码输入框组件</h3>
		<inputPwdVue v-model="password" />
	</div>
</template>

<script>
import inputPwdVue from './input-pwd.vue';
export default {
	name: '',
	components: {
		inputPwdVue
	},
	data() {
		return {
			password: ''
		};
	}
};
</script>

<style lang='less' scoped>
</style>