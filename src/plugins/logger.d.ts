import esbuild from "esbuild";
export declare const loggerMessages: {
    buildFulfilled: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    buildRejected: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    watchFulfilled: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    watchRejected: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    watchStarted: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    watchFinished: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
    removeOutdir: (response?: void | esbuild.BuildResult<esbuild.BuildOptions> | undefined) => void;
};
export declare const plugin: esbuild.Plugin;
//# sourceMappingURL=logger.d.ts.map