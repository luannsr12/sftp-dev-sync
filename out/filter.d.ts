export declare class Filter {
    private includeFolders;
    private includeFiles;
    constructor(includeFolders?: string[], includeFiles?: string[]);
    /**
     * Check if a file path should be included based on filters
     */
    shouldInclude(filePath: string, isDirectory: boolean): boolean;
    private matchPattern;
}
//# sourceMappingURL=filter.d.ts.map