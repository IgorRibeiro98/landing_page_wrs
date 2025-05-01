import { RouteLocationNormalized } from "vue-router";
import { Meta } from '@/router'
interface Route extends RouteLocationNormalized {
    meta: Meta
}
export type Guard = (to: Route, from: Route) => { name: string } | boolean;


export default {
}
