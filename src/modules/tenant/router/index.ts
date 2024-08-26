import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/tenant',
        meta: {
            title: 'Tenant',
        },
        component: layouts.default(),
        children: [
            {
                path: 'create',
                name: 'tenant.create',
                component: () => import('@/modules/tenant/views/CreateTenant.vue'),
                meta: {
                    layout: layouts.default(),
                    slugs: {
                        acl: "tenant.create"
                    },
                    guards: [
                        'auth',
                        'acl',
                    ]
                }
            },
            
        ],
    },
    {
        path: '/tenant',
        meta: {
            title: 'Tenant',
        },
        component: () => layouts.blank(),
        children: [
            {
                path: 'change',
                name: 'tenant.change',
                component: () => import('@/modules/tenant/views/ChangeTenant.vue'),
            },
        ],
    },
]

export default routes;
