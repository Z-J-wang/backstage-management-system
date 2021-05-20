<template>
	<div>
    <h3>富文本编辑器组件-wangEditor</h3>
		<theEditor v-model="content" />
	</div>
</template>

<script>
import theEditor from '../components/the-editor.vue';
export default {
	name: '',
	components: {
		theEditor
	},
	data() {
		return {
			content: ''
		};
	}
};
</script>

<style lang='less' scoped>
</style>