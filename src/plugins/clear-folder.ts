import { Plugin } from "esbuild";
import { existsSync, rmSync } from 'node:fs';

import { loggerMessages} from "./logger";

export const clearFolder: Plugin = {
    name: 'clear-folder',
    setup: (build) => {
        build.onStart(() => {
            const { outdir } = build.initialOptions;
            
            if (outdir && existsSync(outdir)) {
                rmSync(outdir, { recursive: true });
                loggerMessages.removeOutdir();
            }
        });
    }
}