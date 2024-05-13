import { type RouteRecordRaw } from 'vue-router'
import { layouts } from '@/router'

const routes: RouteRecordRaw[] = [
    {
        path: '/management',
        component: () => layouts.default(),
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
        ],
    }
]

export default routes;
