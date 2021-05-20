<template>
	<div>
		<h3>密码输入框组件</h3>
		<inputPwdVue v-model="password" />
		<pre v-highlightjs="sourcecode"><code class="javascript"></code></pre>
	</div>
</template>

<script>
import inputPwdVue from '../components/input-pwd.vue';
export default {
	name: '',
	components: {
		inputPwdVue
	},
	data() {
		return {
			password: '',
			sourcecode: ``
		};
	},
	created() {
		this.sourcecode = `
<template></template>
	<div class="password-input" :style="{ width: width }">
		<input
			style="ime-mode: disabled"
			:value="hideValue"
			@compositionstart="compositionstartHandle"
			@compositionend="compositionendHandle"
			@input="inputHandel"
			ref="password-input"
			:placeholder="placeholder"
		/>
		<div class="btn-show" @click="isShow = !isShow">
			<img
				v-if="isShow"
				src="@/modules/case-show/modules/input-password/assets/pwd-show.png"
			/>
			<img
				v-else
				src="@/modules/case-show/modules/input-password/assets/pwd-hide.png"
			/>
		</div>
	</div>
</template>`;
	}
};
</script>

<style lang='less' scoped>
.javascript {
	text-align: left;
}
</style>