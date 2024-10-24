import type { ConsoleFilter } from '@cloudforet/core-lib/query/type';

import type { RelativePeriod } from '@/services/cost-explorer/cost-analysis/type';
import type { FILTER, GRANULARITY, GROUP_BY } from '@/services/cost-explorer/lib/config';


export interface Period {
    start?: string;
    end?: string;
}

export type Granularity = typeof GRANULARITY[keyof typeof GRANULARITY];
export type GroupBy = typeof GROUP_BY[keyof typeof GROUP_BY];
export type Filter = typeof FILTER[keyof typeof FILTER];


interface CostQuerySetOption {
    group_by?: Array<string|GroupBy>;
    granularity: Granularity;
    period?: Period;
    relative_period?: RelativePeriod;
    filters?: ConsoleFilter[];
    metadata?: {
        filters_schema?: {
            enabled_properties?: string[];
        }
    }
}

export interface CostQuerySetOptionForPeriod {
    granularity: Granularity;
    period?: Period;
    relativePeriod: RelativePeriod;
}

export interface CostQuerySetModel {
    cost_query_set_id: string;
    data_source_id: string; // This isn't using in cost-analysis now. Just used in GNB favorite.
    name: string;
    options?: CostQuerySetOption;
}

export interface CostAnalyzeResponse<CostAnalyzeRawData> {
    more?: boolean;
    results: CostAnalyzeRawData[];
}
