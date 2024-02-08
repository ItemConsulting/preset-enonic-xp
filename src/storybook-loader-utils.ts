import { join, sep } from "path";
import { urlToRequest } from "loader-utils";

export function getPathRelativeToResources(resourcePath: string): string {
  const resourcesDir = join("src", "main", "resources");
  const srcDirIndex = resourcePath.indexOf(resourcesDir);

  return resourcePath.substring(srcDirIndex + resourcesDir.length + sep.length);
}

export function getDependencyFilePaths(source: string, resourcePath: string, pathRegex: RegExp): string[] {
  const importFilePaths: string[] = [];

  for (const match of source.matchAll(pathRegex)) {
    const url = match[1];

    const isAbsolutePath = url.substring(0, sep.length) === sep;
    const fullImportFile = urlToRequest(url, isAbsolutePath ? getBaseDir(resourcePath) : undefined);

    importFilePaths.push(fullImportFile);
  }

  return importFilePaths;
}

function getBaseDir(resourcePath: string): string {
  const resourcesDir = join("src", "main", "resources");
  const srcDirIndex = resourcePath.indexOf(resourcesDir);
  return resourcePath.substring(0, srcDirIndex + resourcesDir.length);
}
