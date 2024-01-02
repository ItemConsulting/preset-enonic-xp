import { sep, join } from "path";
import { urlToRequest, getHashDigest } from "loader-utils";

export type FileMetaData = {
  id: string;
  hash: string;
  params: {
    filePath: string;
    baseDirPath: string;
  }
};

export default function loader(source: string): string {
  const result = getFileMetaData(source, this.resourcePath)
  const requires = getDependencyFilePaths(source, result.params.baseDirPath).map(path => `require("${path}");`).join("\n")

  return `${requires}\nexport default ${JSON.stringify(result)};`;
}

export function getDependencyFilePaths(source: string, baseDirPath: string): string[] {
  const pathRegex = /\[#import "(.*?)".*?]/ig;

  const importFilePaths: string[] = []

  for (const match of source.matchAll(pathRegex)) {
    const url = match[1]
    let fullImportFile = urlToRequest(url, url.substring(0, sep.length) === sep ? baseDirPath : undefined);

    importFilePaths.push(fullImportFile);
  }

  return importFilePaths;
}

export function getFileMetaData(source: string, filePath: string): FileMetaData {
  const resourcesDir = join("src", "main", "resources");
  const srcDirIndex = filePath.indexOf(resourcesDir);

  return {
    id: filePath.substring(srcDirIndex + resourcesDir.length + sep.length),
    // hash must be present to invalidate previous build
    hash: getHashDigest(source),
    params: {
      filePath,
      baseDirPath: filePath.substring(0, srcDirIndex + resourcesDir.length)
    }
  }
}
