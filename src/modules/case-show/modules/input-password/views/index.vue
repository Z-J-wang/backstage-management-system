<template>
	<template-code
		:HTML="sourcecode.HTML"
		:Javascript="sourcecode.Javascript"
		:CSS="sourcecode.CSS"
	>
		<h3 slot="title">密码输入框组件</h3>
		<div slot="show">
			<inputPwdVue v-model="password" />
		</div>
	</template-code>
</template>

<script>
import inputPwdVue from '../components/input-pwd.vue';
import code from '../assets/code'
export default {
	name: '',
	components: {
		inputPwdVue
	},
	data() {
		return {
			collapseName: 'HTML',
			password: '',
			sourcecode: {
				HTML: ``,
				Javascript: '',
				CSS: ''
			}
		};
	},
	created() {
		this.sourcecode.HTML = code.HTML;
		this.sourcecode.Javascript = code.Javascript;
		this.sourcecode.CSS = code.CSS;
	}
};
</script>

<style lang='less' scoped>
.main {
	display: flex;
	flex-direction: row;
	justify-content: center;
	& > div {
		flex: 1;
		padding: 30px;
		text-align: left;
	}
}
</style>