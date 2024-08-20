import { Slugs } from './../../../router/index';
import { layouts } from '@/router';
import { type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/management',
        component: () => layouts.default(),
        meta: {
            guards: [
                'auth',
            ]
        },
        children: [
            {
                path: 'acl',
                name: 'management.acl',
                component: () => import('@/modules/management/views/acl/Roles.vue')
            },
            {
                path: 'acl/create',
                name: 'management.acl.create',
                component: () => import('@/modules/management/views/acl/RoleCreate.vue')
            },
            {
                path: 'acl/edit/:id',
                name: 'management.acl.edit',
                component: () => import('@/modules/management/views/acl/RoleUpdate.vue'),
                props: true,

            },
            {
                path: 'users',
                name: 'management.users',
                component: () => import('@/modules/management/views/user/Users.vue'),
                meta: {
                    guards: ['acl'],
                    slugs: {
                        acl: "user.view"
                    },
                }
            },
        ],
    }
]

export default routes;
