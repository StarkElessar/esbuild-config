export interface DefineConfig {
	isDevelopment: boolean;
	aliases: Record<string, string>;
	entryPoints: string[];
	outdir: string;
	tsconfig?: string;
}