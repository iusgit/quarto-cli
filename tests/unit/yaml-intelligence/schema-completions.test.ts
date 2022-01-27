/*
 * yaml-intelligence.test.ts
 *
 * Copyright (C) 2022 by RStudio, PBC
 *
 */

import { expandGlobSync } from "fs/mod.ts";
import { unitTest } from "../../test.ts";

import { assert, assertEquals } from "testing/asserts.ts";

import { Semaphore } from "../../../src/core/lib/semaphore.ts";

import { initTreeSitter } from "../../../src/core/lib/yaml-validation/deno-init-tree-sitter.ts";
import { initPrecompiledModules } from "../../../src/core/lib/yaml-validation/deno-init-precompiled-modules.ts";
import { setInitializer, initState } from "../../../src/core/lib/yaml-validation/state.ts";
import { getAutomation, CompletionResult } from "../../../src/core/lib/yaml-intelligence/yaml-intelligence.ts";
import { resolveSchema, getSchemas } from "../../../src/core/lib/yaml-validation/schema-utils.ts";
import { Completion } from "../../../src/core/lib/yaml-validation/schema.ts";

async function fullInit() {
  await initPrecompiledModules();
  await initTreeSitter();
};

unitTest("schema-completions", async () => {
  setInitializer(fullInit);
  await initState();

  const schema = resolveSchema(getSchemas().schemas.engines["knitr"]);
  assert(schema.completions.filter((c: Completion) => c.value === "tbl-column: ")[0].description.length > 0);
});