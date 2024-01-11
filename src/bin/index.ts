import createCac from "cac"
import { walkAction } from "@/actions/walk"
import pkgJson from "../../package.json"

const cac = createCac(pkgJson.name)

cac
  .command("walk <source>", "walk the exports of a file")
  .option("-w, --write", "write the dts file")
  .option("-p, --write-path <path>", "path to write the dts file")
  .action(walkAction)

cac.help()

cac.version(pkgJson.version)

cac.parse()
