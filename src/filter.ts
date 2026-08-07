import { minimatch } from 'minimatch';

export class Filter {
  private includeFolders: string[];
  private includeFiles: string[];

  constructor(includeFolders: string[] = [], includeFiles: string[] = []) {
    this.includeFolders = includeFolders;
    this.includeFiles = includeFiles;
  }

  /**
   * Check if a file path should be included based on filters
   */
  shouldInclude(filePath: string, isDirectory: boolean): boolean {
    // If no include filters are specified, include everything
    if (this.includeFolders.length === 0 && this.includeFiles.length === 0) {
      return true;
    }

    const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();

    // For directories, check against includeFolders
    if (isDirectory) {
      if (this.includeFolders.length === 0) {
        return true;
      }

      return this.includeFolders.some((pattern) =>
        this.matchPattern(normalizedPath, pattern.toLowerCase())
      );
    }

    // For files, check includeFolders first
    let folderMatch = true;
    if (this.includeFolders.length > 0) {
      folderMatch = this.includeFolders.some((pattern) =>
        this.matchPattern(normalizedPath, pattern.toLowerCase())
      );
    }

    if (!folderMatch) {
      return false;
    }

    // Then check includeFiles patterns
    if (this.includeFiles.length === 0) {
      return true;
    }

    return this.includeFiles.some((pattern) =>
      minimatch(normalizedPath, pattern.toLowerCase(), { dot: true })
    );
  }

  private matchPattern(filePath: string, pattern: string): boolean {
    // Direct pattern matching
    if (filePath === pattern) {
      return true;
    }

    // Pattern is a folder that filePath is inside
    if (filePath.startsWith(pattern + '/')) {
      return true;
    }

    // Glob pattern matching
    return minimatch(filePath, pattern + '/**', { dot: true });
  }
}
