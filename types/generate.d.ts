export interface GenerateOptions {
    /** base data directory */
    dir: string;
    /** run after generation */
    after?: string;
    /** suppress output */
    silent?: boolean;
}
export interface WatchOptions extends GenerateOptions {
    /** debounce delay in ms */
    debounce?: number;
}
export interface GenerateResult {
    filesChanged: number;
    modelCount: number;
    schemaCount: number;
    queryCount: number;
    mutationCount: number;
}
export declare function generate(options: GenerateOptions): Promise<GenerateResult>;
export declare function watch(options: WatchOptions): Promise<import("chokidar").FSWatcher>;
//# sourceMappingURL=generate.d.ts.map