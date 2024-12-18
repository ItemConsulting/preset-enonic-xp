import { getHashDigest } from "loader-utils";
import { getDependencyFilePaths, getPathRelativeToResources } from "./storybook-loader-utils.js";

export default function loader(source: string): string {
  const pathRegex = /\[#import "(.*?)".*?]/gi;
  const requires = getDependencyFilePaths(source, this.resourcePath, pathRegex)
    .map((path) => `require("${escapePathForWindows(path)}");`)
    .join("\n");

  // Don't escape for Windows. The exported path is intended for URLs
  return `${requires}\nexport default "${getPathForURLs(getPathRelativeToResources(this.resourcePath))}"; /* hash=${getHashDigest(
    source,
  )} */`;
}

function escapePathForWindows(path: string): string {
  return path.replace(/\\/g, "\\\\");
}

function getPathForURLs(path: string): string {
  return path.replace(/\\/g, "/");
}
