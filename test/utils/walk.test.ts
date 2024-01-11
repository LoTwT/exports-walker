import { resolve } from "node:path"
import { getDirname } from "@ayingott/sucrose"
import { getExportStatements, parse } from "@/utils"

describe("utils/walk", () => {
  const _dirname = getDirname(import.meta.url)

  function resolvePath(p: string) {
    return resolve(_dirname, p)
  }

  test.each([
    {
      source: resolvePath("../fixtures/mock-exists.ts"),
      expected: "const one = 1",
      desc: "existing file",
    },
    {
      source: resolvePath("../fixtures/non-exists.ts"),
      expected: resolvePath("../fixtures/non-exists.ts"),
      desc: "non existing file",
    },
    {
      source: `console.log("code-source")`,
      expected: `console.log("code-source")`,
      desc: "code",
    },
  ])("parse $desc", async ({ source, expected }) => {
    expect((await parse(source)).text().trim()).toBe(expected)
  })

  test.each([
    {
      code: `
export const v

export default 42
export default function f() {}
export default function () {}
export default class {}
export default class Cls {}

export { x }
export { v as x }
export { x } from "mod"
export { v as x } from "mod"
export * as ns from "mod"

export * from "mod"

export type { x }
export { type x }
export type * from "mod"
`,
      expected: 15,
    },
    { code: `const a = 1`, expected: 0 },
  ])("getExportStatements %#", async ({ code, expected }) => {
    expect(getExportStatements(await parse(code)).length).toBe(expected)
  })
})
