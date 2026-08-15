import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

import {waddler} from 'waddler/duckdb-neo'

import {env} from '@/lib/env'

export type Sql = ReturnType<typeof waddler>

let sqlPromise: Promise<Sql> | null = null

export function getSql() {
  sqlPromise ??= init()
  return sqlPromise
}

async function init() {
  await mkdir(dirname(env.DUCKDB_PATH), {recursive: true})
  return waddler({url: env.DUCKDB_PATH})
}
