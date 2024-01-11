import { resolve } from "node:path"
import { getDirname } from "@ayingott/sucrose"
import { isFileExists } from "@/utils"

describe("utils/fs", () => {
  const _dirname = getDirname(import.meta.url)

  function resolvePath(p: string) {
    return resolve(_dirname, p)
  }

  test.each([
    { filepath: "../fixtures/mock-exists.ts", expected: true },
    { filepath: "../fixtures/non-exists.ts", expected: false },
    { filepath: "unkonwn-file", expected: false },
  ])("isFileExists $filepath", ({ filepath, expected }) => {
    expect(isFileExists(resolvePath(filepath))).resolves.toBe(expected)
  })
})
