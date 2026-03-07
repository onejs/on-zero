import type { AuthData, Can, GenericModels, GetZeroMutators } from '../types';
export type ValidateMutationFn = (args: {
    authData: AuthData | null;
    mutatorName: string;
    tableName: string;
    args: unknown;
}) => void | Promise<void>;
export type { ValidateMutationFn as CreateMutatorsValidateFn };
export declare function createMutators<Models extends GenericModels>({ environment, authData, createServerActions, asyncTasks, can, models, validateMutation, mutationValidators, }: {
    environment: 'server' | 'client';
    authData: AuthData | null;
    can: Can;
    models: Models;
    asyncTasks?: Array<() => Promise<void>>;
    createServerActions?: () => Record<string, any>;
    validateMutation?: ValidateMutationFn;
    /** valibot schemas keyed by model.mutationName, auto-validates args before running */
    mutationValidators?: Record<string, Record<string, any>>;
}): GetZeroMutators<Models>;
//# sourceMappingURL=createMutators.d.ts.map