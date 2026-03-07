import { type ReactNode } from 'react';
import { resolveQuery, type PlainQueryFn } from './resolveQuery';
import type { AuthData, GenericModels, GetZeroMutators, ZeroEvent } from './types';
import type { Query, Row, Zero, ZeroOptions, Schema as ZeroSchema } from '@rocicorp/zero';
type PreloadOptions = {
    ttl?: 'always' | 'never' | number | undefined;
};
export type GroupedQueries = Record<string, Record<string, (...args: any[]) => any>>;
export type PermissionStrategy = 'optimistic' | 'optimistic-deny' | 'optimistic-allow';
export declare function createZeroClient<Schema extends ZeroSchema, Models extends GenericModels>({ schema, models, groupedQueries, permissionStrategy, }: {
    schema: Schema;
    models: Models;
    groupedQueries: GroupedQueries;
    permissionStrategy?: PermissionStrategy;
}): {
    zeroEvents: import("@take-out/helpers").Emitter<ZeroEvent | null>;
    ProvideZero: ({ children, authData: authDataIn, disable, ...props }: Omit<ZeroOptions<Schema, GetZeroMutators<Models>>, "schema" | "mutators"> & {
        children: ReactNode;
        authData?: AuthData | null;
        disable?: boolean;
    }) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
    ControlQueries: ({ children, action, whenDisabled, }: {
        children: ReactNode;
        action?: "enable" | "disable";
        whenDisabled?: "empty" | "last-value";
    }) => import("react/jsx-runtime").JSX.Element;
    useQuery: import("./createUseQuery").UseQueryHook<Schema>;
    usePermission: (table: (keyof Schema["tables"] & string) | (string & {}), objOrId: string | Partial<Row<any>> | undefined, enabled?: boolean, debug?: boolean) => boolean | null;
    zero: Zero<Schema, GetZeroMutators<Models>, unknown>;
    preload: {
        <TArg, TTable extends keyof Schema["tables"] & string, TReturn>(fn: PlainQueryFn<TArg, Query<TTable, Schema, TReturn>>, params: TArg, options?: PreloadOptions): {
            cleanup: () => void;
            complete: Promise<void>;
        };
        <TTable extends keyof Schema["tables"] & string, TReturn>(fn: PlainQueryFn<void, Query<TTable, Schema, TReturn>>, options?: PreloadOptions): {
            cleanup: () => void;
            complete: Promise<void>;
        };
    };
    getQuery: {
        <TArg, TTable extends keyof Schema["tables"] & string, TReturn>(fn: PlainQueryFn<TArg, Query<TTable, Schema, TReturn>>, params: TArg): ReturnType<typeof resolveQuery<Schema>>;
        <TTable extends keyof Schema["tables"] & string, TReturn>(fn: PlainQueryFn<void, Query<TTable, Schema, TReturn>>): ReturnType<typeof resolveQuery<Schema>>;
    };
};
export {};
//# sourceMappingURL=createZeroClient.d.ts.map