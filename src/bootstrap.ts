import useTenantStore from "@/modules/tenant/store";
import useAuthStore from "@/stores/user";

export default function (route: any) {
  let routeGuard = route.currentRoute.value.meta.guards?.find((guard: string) => guard == 'auth')

  if (!routeGuard?.length) return

  const tenantStore = useTenantStore()
  const userStore = useAuthStore()

  userStore.loadUser()
  tenantStore.loadTenant()
}
