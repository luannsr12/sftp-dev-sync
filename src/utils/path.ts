import * as upath from 'upath';

export function normalize(filePath: string): string {
  return upath.toUnix(filePath);
}

export function join(...paths: string[]): string {
  return upath.join(...paths);
}

export function relative(from: string, to: string): string {
  return upath.relative(from, to);
}

export function basename(filePath: string): string {
  return upath.basename(filePath);
}

export function dirname(filePath: string): string {
  return upath.dirname(filePath);
}
