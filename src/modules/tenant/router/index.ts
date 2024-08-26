import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/tenant',
        component: () => layouts.default(),
        meta: {
            title: 'Tenant',
            slugs: {
                acl: "tenant.create"
            },
            guards: [
                'auth',
                'acl',
            ]
        },
        children: [
            {
                path: 'create',
                name: 'tenant.create',
                component: () => import('@/modules/tenant/views/CreateTenant.vue')
            },
        ],
    },
]

export default routes;
