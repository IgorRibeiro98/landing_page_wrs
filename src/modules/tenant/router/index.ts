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
              path: '',
              name: 'tenant.view',
              component: () => import('@/modules/tenant/views/Tenants.vue'),
              meta: {
                slugs: {
                    acl: "tenant.view"
                },
                guards: [
                    'auth',
                    'acl',
                ]
              }
            },
            {
                path: 'create',
                name: 'tenant.create',
                component: () => import('@/modules/tenant/views/CreateTenant.vue'),
                meta: {
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
        path: '/change',
        meta: {
            title: 'Tenant',
        },
        component: () => layouts.blank(),
        children: [
            {
                path: 'tenant',
                name: 'tenant.change',
                component: () => import('@/modules/tenant/views/ChangeTenant.vue'),
            },
        ],
    },
]

export default routes;
