export interface DefineConfig {
	isDevelopment: boolean;
	aliases: Record<string, string>;
	entryPoints: string[];
	outdir: string;
	tsconfig?: string;
}

export declare module 'esbuild-config' {
	export const defineConfig: (externalConfig: DefineConfig) => void;
}