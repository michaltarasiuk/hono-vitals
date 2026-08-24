import {fileURLToPath} from 'node:url';

import {waddler} from 'waddler/duckdb-neo';

const url = fileURLToPath(new URL('../../data/vitals.duckdb', import.meta.url));

export const sql = waddler({url});

export type Sql = typeof sql;
