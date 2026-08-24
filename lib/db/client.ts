import {fileURLToPath} from 'node:url';

import {waddler} from 'waddler/duckdb-neo';

const duckdbPath = fileURLToPath(
  new URL('../../data/vitals.duckdb', import.meta.url),
);

export const sql = waddler({url: duckdbPath});

export type Sql = typeof sql;
