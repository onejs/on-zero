import { type PlainQueryFn } from './resolveQuery';
import type { AnyQueryRegistry, HumanReadable, Query, Schema as ZeroSchema } from '@rocicorp/zero';
export declare function setCustomQueries(queries: AnyQueryRegistry): void;
export declare function query<Schema extends ZeroSchema, TArg, TTable extends keyof Schema['tables'] & string, TReturn>(fn: PlainQueryFn<TArg, Query<TTable, Schema, TReturn>>, params: TArg, mode?: 'cached'): Promise<HumanReadable<TReturn>>;
export declare function query<Schema extends ZeroSchema, TTable extends keyof Schema['tables'] & string, TReturn>(fn: PlainQueryFn<void, Query<TTable, Schema, TReturn>>, mode?: 'cached'): Promise<HumanReadable<TReturn>>;
//# sourceMappingURL=query.d.ts.map