import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

import {waddler} from 'waddler/duckdb-neo'

import {env} from '@/lib/env'
import {isDefined} from '@/lib/is-defined'

type Sql = ReturnType<typeof waddler>

let sql: Sql | null = null
let connectPromise: Promise<Sql> | null = null

export async function getSql() {
  if (isDefined(sql)) {
    return sql
  }

  if (!isDefined(connectPromise)) {
    connectPromise = (async () => {
      await mkdir(dirname(env.DUCKDB_PATH), {recursive: true})
      sql = waddler({url: env.DUCKDB_PATH})
      return sql
    })()
  }

  return connectPromise
}
