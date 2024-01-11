import { isAbsolute, resolve } from "node:path"
import { cwd } from "node:process"
import { type WalkOptions, walk } from ".."

export interface WalkActionOptions extends WalkOptions {}

export async function walkAction(source: string, options: WalkActionOptions) {
  if (!isAbsolute(source)) {
    source = resolve(cwd(), source)
  }

  const dtsContent = await walk(source, options)

  if (!options.write) {
    // eslint-disable-next-line no-console
    console.log(dtsContent)
  }
}
