import { sep, join } from "path";
import { urlToRequest, getHashDigest } from "loader-utils";

export default function loader(source: string): string {
  const requires = getDependencyFilePaths(source, this.resourcePath)
    .map((path) => `require("${path}");`)
    .join("\n");

  return `${requires}\nexport default "${this.resourcePath}?hash=${getHashDigest(source)}";`;
}

export function getDependencyFilePaths(source: string, resourcePath: string): string[] {
  const resourcesDir = join("src", "main", "resources");
  const srcDirIndex = resourcePath.indexOf(resourcesDir);
  const baseDirPath = resourcePath.substring(0, srcDirIndex + resourcesDir.length);
  const pathRegex = /\[#import "(.*?)".*?]/gi;

  const importFilePaths: string[] = [];

  for (const match of source.matchAll(pathRegex)) {
    const url = match[1];

    const isAbsolutePath = url.substring(0, sep.length) === sep;
    const fullImportFile = urlToRequest(url, isAbsolutePath ? baseDirPath : undefined);

    importFilePaths.push(fullImportFile);
  }

  return importFilePaths;
}
