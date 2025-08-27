import test from "node:test";
import { strict as assert } from "node:assert";
import { getDependencyFilePaths } from "../dist/storybook-loader-utils.js";

test("get dependencies", (t) => {
  const source = `
    [#import "../../views/partials/header/header.ftl" as h]
    [#import "../../views/partials/footer/footer.ftl" as f]
  `;

  const filePaths = getDependencyFilePaths(source, "", /\[#import "(.*?)".*?]/gi);

  assert.deepStrictEqual(filePaths, [
    "../../views/partials/header/header.ftl",
    "../../views/partials/footer/footer.ftl",
  ]);
});
