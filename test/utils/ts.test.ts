import { getDts } from "@/utils"

describe("utils/ts", () => {
  test("getDts", async () => {
    const code = `
export function add(a: number, b: number): number;
export function add(a: string, b: string): string;
export function add(a, b) {
  return a + b
}
export const one = 1
`
    expect((await getDts(code)).trim()).toMatchInlineSnapshot(
      `
      "export declare function add(a: number, b: number): number;
      export declare function add(a: string, b: string): string;
      export declare const one = 1;"
    `,
    )
  })
})
