import { v4 as uuidv4 } from 'uuid';

import { ERROR_CASE_WIDGET_INFO } from '@/services/dashboards/default-dashboard/config';
import type { WidgetCustomTitleMap } from '@/services/dashboards/default-dashboard/templates/type';
import type { DashboardLayoutWidgetInfo, InheritOptions } from '@/services/dashboards/widgets/_configs/config';
import { getWidgetConfig } from '@/services/dashboards/widgets/_helpers/widget-helper';

export const getDashboardLayoutWidgetInfoList = (widgetList: string[], widgetCustomTitleMap?: WidgetCustomTitleMap): DashboardLayoutWidgetInfo[] => widgetList.map((widgetId) => {
    try {
        const widgetConfig = getWidgetConfig(widgetId);
        const widgetConfigTitle = widgetConfig.title ?? widgetConfig.widget_config_id;
        const title = widgetCustomTitleMap ? (widgetCustomTitleMap[widgetId] ?? widgetConfigTitle) : widgetConfigTitle;
        const defaultProperties = widgetConfig.options_schema?.default_properties ?? [];
        const requiredProperties = widgetConfig.options_schema?.schema.required ?? [];
        const inheritOptions: InheritOptions = {};
        defaultProperties.filter((d) => !requiredProperties.includes(d)).forEach((propertyName) => {
            inheritOptions[propertyName] = {
                enabled: true,
                variable_info: { key: propertyName.replace('filters.', '') },
            };
        });
        const widgetInfo: DashboardLayoutWidgetInfo = {
            widget_key: uuidv4(),
            widget_name: widgetConfig.widget_config_id,
            title,
            widget_options: widgetConfig.options ?? {},
            size: widgetConfig.sizes[0],
            version: '1',
            inherit_options: inheritOptions,
            default_schema_properties: defaultProperties,
        };
        return widgetInfo;
    } catch (e) {
        console.error(e);
        return ERROR_CASE_WIDGET_INFO;
    }
});
