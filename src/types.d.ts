declare module 'postcss-sort-media-queries';

interface DefineConfig {
	isDevelopment: boolean;
	aliases: Record<string, string>;
	entryPoints: string[];
	outdir: string;
	tsconfig?: string;
}