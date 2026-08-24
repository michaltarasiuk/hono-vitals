import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import {waddler} from 'waddler/duckdb-neo'

const duckdbPath = fileURLToPath(
  new URL('../../data/vitals.duckdb', import.meta.url),
)

export type Sql = ReturnType<typeof waddler>

let sqlPromise: Promise<Sql> | null = null

export function getSql() {
  sqlPromise ??= init()
  return sqlPromise
}

async function init() {
  await mkdir(dirname(duckdbPath), {recursive: true})
  return waddler({url: duckdbPath})
}
