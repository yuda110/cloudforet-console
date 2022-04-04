/* eslint-disable camelcase */
import { Reference, ReferenceType } from '@/lib/reference/type';
import { DynamicFieldProps } from '@spaceone/design-system/dist/src/data-display/dynamic/dynamic-field/type';
import { referenceRouter } from '@/lib/reference/referenceRouter';
import { store } from '@/store';
import { SpaceRouter } from '@/router';

interface FieldFormatter {
    (data: string, reference: Reference): Partial<DynamicFieldProps>;
}

type FormatterMap = Record<ReferenceType, FieldFormatter>
/**
 * getter - reference/fieldItems
 *
 *
 */
const formatterMap: FormatterMap = {
    'identity.Provider': () => store.getters['reference/provider/fieldItems'],
    'inventory.Server': (data, reference) => ({
        data,
        link: SpaceRouter.router.resolve(referenceRouter(data, reference)).href,
    }),
    'identity.Project': (data, reference) => ({
        data: store.state.reference.project.items[data]?.label || data,
        options: {
            link: SpaceRouter.router.resolve(referenceRouter(data, reference)).href,
        },
    }),
    'inventory.Collector': (data, reference) => ({
        data: store.state.reference.collector.items[data]?.label || data,
        options: {
            link: SpaceRouter.router.resolve(referenceRouter(data, reference)).href,
        },
    }),
    'identity.ServiceAccount': (data, reference) => ({
        data: store.state.reference.serviceAccount.items[data]?.label || data,
        options: {
            link: SpaceRouter.router.resolve(referenceRouter(data, reference)).href,
        },
    }),
    'inventory.Region': data => ({
        data: store.state.reference.region.items[data]?.label || data,
    }),
    'inventory.CloudService': (data, reference) => ({
        options: {
            link: SpaceRouter.router.resolve(referenceRouter(data, reference)).href,
        },
    }),
    'secret.Secret': data => ({
        data: store.state.reference.secret.items[data]?.label || data,
    }),
};

export const referenceFieldFormatter = (
    reference: Reference, data: string,
): ReturnType<FieldFormatter> => {
    if (formatterMap[reference.resource_type]) {
        return formatterMap[reference.resource_type](data, reference);
    }
    console.error(`[referenceFieldFormatter]: ${reference.resource_type} is not supported`);
    return {};
};
