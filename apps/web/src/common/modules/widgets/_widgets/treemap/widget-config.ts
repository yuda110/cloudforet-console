import type { WidgetConfig } from '@/common/modules/widgets/types/widget-config-type';


const treemap: WidgetConfig = {
    widgetName: 'treemap',
    meta: {
        title: 'Treemap',
        sizes: ['md', 'full'],
        defaultValidationConfig: {
            defaultMaxCount: 1,
        },
    },
    requiredFieldsSchema: {
        granularity: {},
        dataField: {},
        categoryBy: {
            options: {
                dataTarget: 'labels_info',
                defaultMaxCount: 20,
                max: 30,
                defaultIndex: 0,
            },
        },
    },
    optionalFieldsSchema: {
        dateFormat: {
            options: {
                default: 'MMM DD, YYYY',
            },
        },
    },
};


export default treemap;
