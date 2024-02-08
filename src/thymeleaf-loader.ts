import { getHashDigest } from "loader-utils";
import { getDependencyFilePaths, getPathRelativeToResources } from "./storybook-loader-utils.js";

export default function loader(source: string): string {
  const pathRegex = /data-th-replace="(.*?)".*?]/gi;
  const requires = getDependencyFilePaths(source, this.resourcePath, pathRegex)
    .map((path) => `require("${escapePathForWindows(path)}");`)
    .join("\n");

  return `${requires}\nexport default "${getPathRelativeToResources(this.resourcePath)}"; /* hash=${getHashDigest(
    source,
  )} */`;
}

function escapePathForWindows(path: string): string {
  return path.replace(/\\/g, "\\\\");
}
