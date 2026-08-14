import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

import {waddler} from 'waddler/duckdb-neo'

import {env} from '@/lib/env'

type Sql = ReturnType<typeof waddler>

const client = createDbClient()

export function getSql() {
  return client.getSql()
}

function createDbClient() {
  let connectPromise: Promise<Sql> | null = null

  async function openConnection() {
    await mkdir(dirname(env.DUCKDB_PATH), {recursive: true})
    return waddler({url: env.DUCKDB_PATH})
  }

  function getSql() {
    connectPromise ??= openConnection()
    return connectPromise
  }

  return {getSql}
}
