import { RouteLocationNormalized } from "vue-router";
import { Meta } from '@/router'
import auth from '@/router/guards/auth'
import acl from '@/router/guards/acl';
interface Route extends RouteLocationNormalized {
    meta: Meta
}
export type Guard = (to: Route, from: Route) => { name: string } | boolean;


export default {
    auth,
    acl
}