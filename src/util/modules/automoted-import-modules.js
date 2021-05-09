/**
 * 自动化批量导入模块
 *
 * 本函数需要配合 webpage 函数 require.context 来使用。
 * @param {Function} context require.context()返回的结果；
 * @returns {Array} 查找到的模块加载后,存入一个数组抛出
 */
function automatedImport(context) {
	return context.keys().map((item) => {
		var value = context(item);

		return value.default || value;
	});
}

export default automatedImport;
