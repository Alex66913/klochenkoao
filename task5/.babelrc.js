/* eslint-disable no-undef */

module.exports = function (api) {
	api.cache(true);

	const development = process.env.NODE_ENV !== 'production';

	const presets = [
		[
			'@babel/preset-react',
			{
				development,
			},
		],
		'@babel/preset-env',
	].filter(Boolean);

	const plugins = [
        "@babel/plugin-transform-runtime",
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: false }],
		['@babel/plugin-proposal-optional-chaining', { loose: false }],
		'react-hot-loader/babel',
	].filter(Boolean);

	return {
		presets,
		plugins,
	};
};
