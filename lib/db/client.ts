import {join} from 'node:path';

import {waddler} from 'waddler/duckdb-neo';

const url = join(process.cwd(), 'data/vitals.duckdb');

export const db = waddler({url});

export type Db = typeof db;
