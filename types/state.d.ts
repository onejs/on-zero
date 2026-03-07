import { type Schema } from '@rocicorp/zero';
import type { AuthData, QueryBuilder } from './types';
export declare const getZQL: () => QueryBuilder;
export declare const getSchema: () => Schema;
export declare const setSchema: (_: Schema) => void;
export declare const getAuthData: () => {} | null;
export declare const setAuthData: (_: AuthData) => void;
export declare const getEnvironment: () => "server" | "client" | null;
export declare const setEnvironment: (env: "client" | "server") => void;
//# sourceMappingURL=state.d.ts.map