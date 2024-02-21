import type { ResourceGroupType } from '@/schema/_common/type';

// variable models
export interface IBaseVariableModel {
    // key: string;
    // name: string;
    meta?: Record<string, any>;
    list(query?: ListQuery): Promise<ListResponse>;
    nameFormatter?: (data: any) => string;
    dependencies?: {
        [variableModelKey: string]: string;
    }
    // prefetch?: boolean; // whether to prefetch data on site init
    //
    // scope?: {
    //     resourceGroup?: Extract<ResourceGroupType, 'DOMAIN'|'WORKSPACE'|'PROJECT'>;
    //     value?: string;
    // };
}
export interface IEnumVariableModel extends IBaseVariableModel {
   meta: {
       key: string;
       name: string;
   };
   values: Value[];
}

interface ResourceVariableMeta {
    key: string;
    name: string;
    resourceType: string;
    idKey: string;
    nameKey: string;
    _properties?: string[];
    _only?: string[]; // protected
    _searchTargets?: string[]; // protected
}

export interface IResourceVariableModel<T = any> extends IBaseVariableModel {
    meta: ResourceVariableMeta;
    nameFormatter(data: any): string;
    keys?(): string[];
    [propertyKey: string]: PropertyObject<T> | any;
}
export interface IResourceValueVariableModel extends IBaseVariableModel {
    resourceType: string;
    referenceKey: string;
}

// property
export interface PropertyOptions<T> {
    key: keyof T;
    name?: string;
    isDataKey?: boolean;
    isFilter?: boolean;
}
export interface PropertyObject<T> {
    key: keyof T;
    name?: string;
    isDataKey?: boolean;
    isFilter?: boolean;
    fixedValue?: any;
    values?(query?: ListQuery): Promise<ListResponse>;
    keys?(): any;
}

// variable model constructor configs
export interface VariableModelConstructorConfig {
    key?: string;
    name?: string;
    // resource model only
    resource_type?: string;
    id_key?: string;
    // enum model only
    values?: Value[];
}
export interface ResourceVariableModelConstructorOptions {
    fixedOptions?: Record<string, any>;
}

// related types
export interface ListQuery {
    search?: string;
    start?: number;
    limit?: number;
    filters?: string[]; // to filter selected items
    options?: Record<string, any>; // for custom options by config
}
export interface ListResponse {
    results: Value[];
    more?: boolean;
}
export interface Value {
    key: string;
    name: string;
}

