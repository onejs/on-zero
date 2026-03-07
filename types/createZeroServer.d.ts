import type { AdminRoleMode, AsyncAction, AuthData, GenericModels, MutatorContext, QueryBuilder, Transaction } from './types';
import type { AnyQueryRegistry, HumanReadable, Query, Schema as ZeroSchema } from '@rocicorp/zero';
type MutateAuthData = Pick<AuthData, 'email' | 'id'> & Partial<AuthData>;
type ServerMutate<Models extends GenericModels> = {
    [Key in keyof Models]: {
        [K in keyof Models[Key]['mutate']]: Models[Key]['mutate'][K] extends (ctx: MutatorContext, arg: infer Arg) => any ? (arg: Arg, authData?: MutateAuthData) => Promise<void> : (authData?: MutateAuthData) => Promise<void>;
    };
};
export type ValidateQueryArgs = {
    authData: AuthData | null;
    queryName: string;
    params: unknown;
};
export type ValidateMutationArgs = {
    authData: AuthData | null;
    mutatorName: string;
    tableName: string;
    args: unknown;
};
export type ValidateQueryFn = (args: ValidateQueryArgs) => void;
export type ValidateMutationFn = (args: ValidateMutationArgs) => void | Promise<void>;
export declare function createZeroServer<Schema extends ZeroSchema, Models extends GenericModels, ServerActions extends Record<string, unknown>>({ createServerActions, database, schema, models, queries, mutations: mutationValidators, validateQuery, validateMutation, defaultAllowAdminRole, defaultMutateAuthData, }: {
    /**
     * The DB connection string, same as ZERO_UPSTREAM_DB
     */
    database: string;
    schema: Schema;
    models: Models;
    createServerActions: () => ServerActions;
    queries?: AnyQueryRegistry;
    /**
     * Generated valibot validators for mutation args, keyed by model.mutationName.
     * Pass the `mutationValidators` export from generated syncedMutations.ts.
     * Args are auto-validated before running the mutation.
     */
    mutations?: Record<string, Record<string, any>>;
    /**
     * Hook to validate queries before execution. Throw to reject.
     * Must be synchronous.
     */
    validateQuery?: ValidateQueryFn;
    /**
     * Hook to validate mutations before execution. Throw to reject.
     */
    validateMutation?: ValidateMutationFn;
    /**
     * Admin role bypass for permissions:
     * - 'all': admin bypasses both query and mutation permissions (default)
     * - 'queries': admin bypasses only query permissions
     * - 'mutations': admin bypasses only mutation permissions
     * - 'off': admin has no special bypass
     */
    defaultAllowAdminRole?: AdminRoleMode;
    /**
     * Default authData used by zeroServer.mutate when no authData is provided
     * and none is available from mutation context or auth scope.
     * Defaults to {}.
     */
    defaultMutateAuthData?: MutateAuthData;
}): {
    handleMutationRequest: ({ authData, request, skipAsyncTasks, }: {
        authData: AuthData | null;
        request: Request;
        skipAsyncTasks?: boolean;
    }) => Promise<{
        response: {
            mutations: {
                id: {
                    id: number;
                    clientID: string;
                };
                result: {
                    data?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
                } | {
                    message?: string | undefined;
                    details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
                    error: "app";
                } | {
                    details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
                    error: "oooMutation" | "alreadyProcessed";
                };
            }[];
        } | {
            mutationIDs?: {
                id: number;
                clientID: string;
            }[] | undefined;
            error: "unsupportedPushVersion";
        } | {
            mutationIDs?: {
                id: number;
                clientID: string;
            }[] | undefined;
            error: "unsupportedSchemaVersion";
        } | {
            mutationIDs?: {
                id: number;
                clientID: string;
            }[] | undefined;
            error: "http";
            status: number;
            details: string;
        } | {
            mutationIDs?: {
                id: number;
                clientID: string;
            }[] | undefined;
            error: "zeroPusher";
            details: string;
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            message: string;
            kind: "PushFailed";
            mutationIDs: {
                id: number;
                clientID: string;
            }[];
            origin: "server";
            reason: "parse" | "database" | "oooMutation" | "unsupportedPushVersion" | "internal";
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            bodyPreview?: string | undefined;
            message: string;
            kind: "PushFailed";
            mutationIDs: {
                id: number;
                clientID: string;
            }[];
            origin: "zeroCache";
            reason: "http";
            status: number;
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            message: string;
            kind: "PushFailed";
            mutationIDs: {
                id: number;
                clientID: string;
            }[];
            origin: "zeroCache";
            reason: "parse" | "internal" | "timeout";
        };
        asyncTasks: AsyncAction[];
    }>;
    handleQueryRequest: ({ authData, request, }: {
        authData: AuthData | null;
        request: Request;
    }) => Promise<{
        response: ["transformed", ({
            message?: string | undefined;
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            error: "app";
            id: string;
            name: string;
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            error: "parse";
            id: string;
            name: string;
            message: string;
        } | {
            id: string;
            name: string;
            ast: import("@rocicorp/zero").AST;
        })[]] | ["transformFailed", {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            message: string;
            kind: "TransformFailed";
            queryIDs: string[];
            origin: "server";
            reason: "parse" | "database" | "internal";
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            bodyPreview?: string | undefined;
            message: string;
            kind: "TransformFailed";
            queryIDs: string[];
            origin: "zeroCache";
            reason: "http";
            status: number;
        } | {
            details?: import("@rocicorp/zero").ReadonlyJSONValue | undefined;
            message: string;
            kind: "TransformFailed";
            queryIDs: string[];
            origin: "zeroCache";
            reason: "parse" | "internal" | "timeout";
        }];
    }>;
    transaction: <CB extends (tx: Transaction) => Promise<any>, Returns extends CB extends (tx: Transaction) => Promise<infer X> ? X : never>(query: CB) => Promise<Returns>;
    mutate: ServerMutate<Models>;
    query: <R>(cb: (q: QueryBuilder) => Query<any, Schema, R>, authData?: AuthData | null) => Promise<HumanReadable<R>>;
};
export {};
//# sourceMappingURL=createZeroServer.d.ts.map