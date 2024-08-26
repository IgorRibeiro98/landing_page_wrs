import { App } from "vue";
import { RouteRecordRaw } from 'vue-router'
import router from '@/router';

export default function install(app: App) {
    interface ModuleMap {
        [key: string]: {
            default: RouteRecordRaw[]
        }
    }

    const modulesRoutes: ModuleMap = import.meta.glob('@/modules/*/router/*.ts', { eager: true });
    Object.values(modulesRoutes).flatMap(m => m.default).forEach(route => router.addRoute(route));

    app.use(router);
}
