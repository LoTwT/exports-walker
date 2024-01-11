import { exists } from "fs-extra"

export function isFileExists(path: string) {
  return exists(path)
}
