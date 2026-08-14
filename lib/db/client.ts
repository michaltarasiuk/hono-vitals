import {mkdir} from 'node:fs/promises'
import {dirname} from 'node:path'

import {waddler} from 'waddler/duckdb-neo'

import {env} from '@/lib/env'
import {isDefined} from '@/lib/is-defined'

type Sql = ReturnType<typeof waddler>

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
    if (!isDefined(connectPromise)) {
      connectPromise = openConnection()
    }
    return connectPromise
  }

  return {getSql}
}

const client = createDbClient()
