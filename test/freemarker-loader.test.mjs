import test from 'node:test';
import { join } from "path"
import { strict as assert } from 'node:assert';
import { getFileMetaData, getDependencyFilePaths } from "../dist/freemarker-loader.js";

test("get file metadata", (t) => {
  const source = "<h1>Testing</h1>";
  const resourcePath = "~/code/project/src/main/resources/site/parts/header.ftl"

  const fileMetaData = getFileMetaData(source, resourcePath);

  assert.deepEqual(fileMetaData, {
    hash: '859e21fa3c351f02',
    id: 'site/parts/header.ftl',
    params: {
      filePath:    join("~", "code", "project", "src", "main", "resources", "site", "parts", "header.ftl"),
      baseDirPath: join("~", "code", "project", "src", "main", "resources")
    }
  });
});


test("get dependencies", (t) => {
  const source = `
  [#import "../../views/partials/header/header.ftl" as h]
  [#import "../../views/partials/footer/footer.ftl" as f]
  `;

  const filePaths = getDependencyFilePaths(source, "");

  assert.deepStrictEqual(filePaths, [
    join("..", "..", "views", "partials", "header", "header.ftl"),
    join("..", "..", "views", "partials", "footer", "footer.ftl")
  ]);
});
