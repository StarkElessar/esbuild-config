declare module 'postcss-sort-media-queries' {
	import { AtRule, Root } from 'postcss';
	import { PluginCreator } from 'postcss';

	// Типизация для функции sortAtRules
	function sortAtRules(
		queries: string[],
		sort: string | ((a: string, b: string) => number),
		sortCSSmq: {
			desktopFirst: (a: string, b: string) => number;
			(a: string, b: string): number;
		}
	): string[];

	// Типизация для объекта параметров
	interface SortMediaQueriesOptions {
		sort?: 'mobile-first' | 'desktop-first' | ((a: string, b: string) => number);
		configuration?: object | boolean;
		onlyTopLevel?: boolean;
	}

	// Основной экспортируемый модуль
	const plugin: PluginCreator<SortMediaQueriesOptions>;

	export = plugin;
}
